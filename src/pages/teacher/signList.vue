<template>
  <div>
    <myTop
      :seletcInfoObjOne="myTopConfiguration.seletcInfoObjOne"
      :searchFn="searchFn"
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
import { myCourse, signCourse, getCourseSignInfo } from "@/api/teacher/";
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
            dateType: "grade",
            showName: "班级名称",
          },
          {
            dateType: "code",
            showName: "班级口令",
          },
          {
            dateType: "name",
            showName: "班级人数",
          },
          {
            dateType: "createTime",
            showName: "创建时间",
          },
        ],
        //   函数
        objFn: [
          {
            type: "",
            callFn: this.editorFn,
            showInfo: "编辑",
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
      console.log(obj);
      this.$confirm("确定要删除班级吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {})
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    editorFn(obj) {
      console.log(obj);
    },
    searchFn(obj) {
      this.searchObj = obj;
    },
    getAllGradeFn() {},
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
          console.log(result);
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
    getInfo(id) {
      console.log("id", id);
      this.classId = id;
      this.pageSize = 10;
      this.allNums = 0;
      this.nowPage = 1;
      this.getSignInfo();
    },
    getSignInfo() {
      getCourseSignInfo({
        courseId: this.classId,
      })
        .then((result) => {
          console.log("签到信息", result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCourse() {
      myCourse({}).then((result) => {
        console.log(result);
        this.options = result.data.records;
      });
    },
  },
  mounted() {
    this.getCourse();
  },
};
</script>

<style>
</style>