<template>
  <div>
    <myTop
      :seletcInfoObjOne="myTopConfiguration.seletcInfoObjOne"
      :buttonInfo="myTopConfiguration.buttonInfo"
      :getInfo="getInfo"
    ></myTop>
    <!-- 列表 -->
    <myList
      :tableData="myListConfiguration.tableData"
      :allType="myListConfiguration.allType"
      :objFn="myListConfiguration.objFn"
    >
    </myList>
    <!-- 分页 -->
    <myPaging
      :nowPage="nowPage"
      :allNums="allNums"
      :pageSize="pageSize"
      :pageChangeFn="pageChangeFn"
      :sizeChangeFn="sizeChangeFn"
    ></myPaging>
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
              v-for="item in options"
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
import myPaging from "@/components/teacher/utilComponents/myPaging.vue";
import myList from "@/components/teacher/utilComponents/myList.vue";
import myTop from "@/components/teacher/utilComponents/myTop.vue";
import { DatePicker, Switch } from "element-ui";
import {
  myCourse,
  signCourse,
  getSignRecords,
  addMessage,
  deleteRecords,
} from "@/api/teacher/";
export default {
  name: "signList",
  components: {
    myPaging,
    myList,
    myTop,
    [DatePicker.name]: DatePicker,
    [Switch.name]: Switch,
  },
  data() {
    return {
      myTopConfiguration: {
        seletcInfoObjOne: {
          showName: "课程",
          type: "getAllCourse",
        },
        buttonInfo: {
          type: "success",
          clickFn: this.addFn,
        },
      },
      myListConfiguration: {
        allType: [
          {
            // dateType表示的是数据
            dateType: "id",
            // 数据显示的名字
            showName: "ID",
          },
          {
            dateType: "noSignedNums",
            showName: "未签到人数",
          },
          {
            dateType: "signedNums",
            showName: "签到人数",
          },
          {
            dateType: "createTime",
            showName: "创建时间",
          },
          {
            dateType: "time",
            showName: "结束时间",
          },
        ],
        //   函数
        objFn: [
          {
            type: "",
            callFn: this.editorFn,
            showInfo: "详情",
          },
          {
            type: "danger",
            callFn: this.deleteFn,
            showInfo: "删除",
          },
        ],
        // 数据
        tableData: [],
      },
      //   分页所需数据
      nowPage: 1,
      pageSize: 10,
      allNums: 0,
      searchObj: null,
      dialogVisible: false,
      className: "",
      startTime: "",
      endTime: "",
      classAll: "",
      options: [],
      courseArr: [],
      judgeEndTime: "",
    };
  },
  methods: {
    pageChangeFn(val) {
      this.nowPage = val;
      this.getSignInfo();
    },
    sizeChangeFn(val) {
      this.pageSize = val;
      this.getSignInfo();
    },
    deleteFn(obj) {
      this.$confirm("确定要删除签到信息吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteRecords({
            ids: obj.id,
          })
            .then((result) => {
              console.log(result);
              this.$message({
                message: "删除成功",
                type: "success",
              });
              this.getInfo(this.classId);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    editorFn(obj) {
      this.$router.push({
        path: "/teacher/signDetails",
        query: {
          id: obj.id,
        },
      });
    },
    getAllGradeFn() {},
    submitFn() {
      if (Date.now() < this.judgeEndTime) {
        this.$message({
          message: "上次签到未结束",
          type: "warning",
        });
        return;
      }
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
      this.$confirm(
        "发布签到在该签到结束之前不能再次发布签到, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
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
                this.dialogVisible = false;
                return addMessage({
                  content: JSON.stringify({
                    createTime: this.startTime,
                    endTime: this.endTime,
                  }),
                  courseId: this.classAll,
                  type: 1,
                });
              }
              this.$message({
                type: "warning",
                message: result.msg,
              });
              this.dialogVisible = false;
              this.clearAll();
            })
            .then(() => {
              this.getInfo(this.classId);
              this.clearAll();
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
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
    getInfo(id) {
      this.classId = id;
      this.pageSize = 10;
      this.allNums = 0;
      this.nowPage = 1;
      this.getSignInfo();
    },
    getSignInfo() {
      getSignRecords({
        courseId: this.classId,
        nodePage: this.nowPage,
        pageSize: this.pageSize,
      })
        .then((result) => {
          for (let i = 0; i < result.data.records.length; i++) {
            result.data.records[i].time = new Date(
              result.data.records[i].endTime
            )
              .toLocaleString()
              .replaceAll("/", "-");
          }
          this.myListConfiguration.tableData = result.data.records;
          this.allNums = result.data.total;
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
    getCourse() {
      myCourse({}).then((result) => {
        this.options = result.data.records;
      });
    },
    getMessageInfo() {
      getSignRecords({
        courseId: this.classAll,
        nodePage: 1,
        pageSize: 1,
      })
        .then((result) => {
          this.judgeEndTime = result.data.records[0].endTime;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  watch: {
    classAll(value) {
      if (value == "") {
        return;
      }
      this.getMessageInfo();
    },
  },
  mounted() {
    this.getCourse();
  },
};
</script>

<style>
</style>