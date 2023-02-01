<template>
  <div>
    <!-- 显示班级 -->
    <el-form label-width="80px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="课程">
            <el-select v-model="course" placeholder="请选择">
              <el-option
                v-for="item in courseArr"
                :key="item.id"
                :label="item.courseName"
                :value="item.id"
              ></el-option>
            </el-select>
            <span style="margin-left: 20px"></span>
            <el-button type="primary" @click="searchByCourse">查询</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="班级:">
            <el-select v-model="className" placeholder="请选择班级">
              <el-option
                v-for="item in gradeArr"
                :key="item.id"
                :label="item.className"
                :value="item.id"
              ></el-option>
            </el-select>
            <span style="margin-left: 20px"></span>
            <el-button type="primary" @click="searchByClass">查询</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <span style="margin-left: 30px"></span>
          <el-button type="success" @click="addFn">添加</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- 签到，与未签 -->
    <div class="sign">
      <div class="signItem">
        <span>已签</span>
        <div class="noInfo" v-show="signedUser.length == 0">
          <span>还没有已签到的人</span>
        </div>
        <div class="signStudent">
          <div class="studentItem" v-for="item in signedUser" :key="item.id">
            <span class="studentInfo">
              <img :src="item.photo" alt="" />
              <span>{{ item.userName }}</span>
            </span>
          </div>
        </div>
      </div>
      <div class="signItem">
        <span>未签</span>
        <div class="noInfo" v-show="unSignUser.length == 0">
          <span>还没有未签到的人</span>
        </div>
        <div class="signStudent">
          <div class="studentItem" v-for="item in unSignUser" :key="item.id">
            <span class="studentInfo">
              <img :src="item.photo" alt="" />
              <span>{{ item.userName }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      :append-to-body="true"
    >
      <el-form label-width="180px">
        <el-form-item label="开始时间:">
          <el-date-picker
            v-model="startTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 80%"
            type="datetime"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间:">
          <el-date-picker
            v-model="endTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            style="width: 80%"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="课程:">
          <el-select v-model="classAll" style="width: 80%" placeholder="请选择">
            <el-option
              v-for="item in courseArr"
              :key="item.id"
              :label="item.courseName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitFn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Row, Col, DatePicker } from "element-ui";
import {
  getGrade,
  myCourse,
  signCourse,
  getCourseSignInfo,
} from "@/api/teacher";

export default {
  name: "signDetails",
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [DatePicker.name]: DatePicker,
  },
  data() {
    return {
      className: "",
      course: "",
      courseArr: [],
      gradeArr: [],
      dialogVisible: false,
      startTime: "",
      endTime: "",
      classAll: "",
      unSignUser: [],
      signedUser: [],
    };
  },
  methods: {
    submitFn() {
      if (Date.parse(this.startTime) > Date.parse(this.endTime)) {
        this.$message({
          message: "结束时间不能先于开始时间",
          type: "warning",
        });
        return;
      }
      if (this.classAll == "") {
        this.$message({
          message: "请选择对应课程",
          type: "warning",
        });
        return;
      }
      signCourse({
        createTime: this.startTime,
        endTime: this.endTime,
        id: this.classAll,
      })
        .then((result) => {
          if (result.msg == "OK") {
            this.$message({
              type: "success",
              message: "已发布",
            });
            this.clearAll();
            this.dialogVisible = false;
            return;
          }
          this.$message({
            type: "warning",
            message: result.msg,
          });
          this.dialogVisible = false;
          this.clearAll();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    addFn() {
      this.dialogVisible = true;
    },
    searchByCourse() {
      if (this.course == "") {
        this.$message({
          message: "请选择课程",
          type: "warning",
        });
        return;
      }
      this.className = "";
      getCourseSignInfo({
        courseId: this.course,
      }).then((result) => {
        if (result.msg != "OK") {
          this.$message({
            message: "该课程没有学生",
            type: "warning",
          });
          this.signedUser = [];
          this.unSignUser = [];
          return;
        }
        this.signedUser = result.data.signedUser ? result.data.signedUser : [];
        this.unSignUser = result.data.unSignUser ? result.data.unSignUser : [];
      });
    },
    searchByClass() {
      // 判断是否为空
      if (this.className == "") {
        this.$message({
          message: "请选择班级",
          type: "warning",
        });
        return;
      }
      this.course = "";
      getCourseSignInfo({
        gradeId: this.className,
      }).then((result) => {
        if (result.msg != "OK") {
          this.$message({
            message: "该班级没有学生",
            type: "warning",
          });
          this.signedUser = [];
          this.unSignUser = [];
          return;
        }
        this.signedUser = result.data.signedUser ? result.data.signedUser : [];
        this.unSignUser = result.data.unSignUser ? result.data.unSignUser : [];
      });
    },
    getAllGradeFn() {
      getGrade({
        beginIndex: 1,
        size: 1,
      })
        .then((result) => {
          return getGrade({
            beginIndex: 1,
            size: result.data.total,
          });
        })
        .then((result) => {
          this.gradeArr = result.data.records;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllCourse() {
      myCourse({})
        .then((result) => {
          this.courseArr = result.data.records;
          this.course = this.courseArr[0].id;
          this.searchByCourse();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    clearAll() {
      this.startTime = "";
      this.endTime = "";
      this.classAll = "";
    },
  },
  mounted() {
    this.getAllGradeFn();
    this.getAllCourse();
  },
};
</script>

<style scoped>
.sign {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.sign > div:first-child {
  border-right: 1px solid black;
}

.signItem {
  padding: 10px;
}

.signItem > span {
  text-align: center;
  display: block;
  width: 100%;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
}

.studentItem {
  display: flex;
  align-items: center;
  padding: 10px 0px;
}

.studentItem > button {
  border: none;
  background-color: #dcdfe6;
  font-size: 16px;
  margin-left: 30px;
  display: none;
  cursor: pointer;
}

.studentItem > button:hover {
  color: red;
}

.studentItem:hover {
  background-color: #dcdfe6;
}

.studentItem:hover > button {
  display: inline-block;
}

.studentInfo {
  display: inline-flex;
  align-items: center;
  margin-left: 50px;
}

.studentInfo > img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.studentInfo > span {
  margin-left: 20px;
}

.noInfo > span {
  display: inline-block;
  width: 100%;
  text-align: center;
}
</style>