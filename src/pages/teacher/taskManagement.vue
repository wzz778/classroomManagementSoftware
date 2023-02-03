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
  </div>
</template>

<script>
import myPaging from "@/components/teacher/utilComponents/myPaging.vue";
import myList from "@/components/teacher/utilComponents/myList.vue";
import myTop from "@/components/teacher/utilComponents/myTop.vue";
// 单选
import singleOption from "@/components/teacher/allQuestion/singleOption";
// 多选
import multiSelect from "@/components/teacher/allQuestion/multiSelect";
// 判断
import judgeQuestion from "@/components/teacher/allQuestion/judgeQuestion";
// 填空
import gapFilling from "@/components/teacher/allQuestion/gapFilling";
// 简答
import shortAnswer from "@/components/teacher/allQuestion/shortAnswer";
import { Row, Col, Card, DatePicker } from "element-ui";
import { getTask, deleteTask } from "@/api/teacher";
export default {
  name: "operationList",
  components: {
    myPaging,
    myList,
    myTop,
    singleOption,
    multiSelect,
    judgeQuestion,
    gapFilling,
    shortAnswer,
    [Row.name]: Row,
    [Col.name]: Col,
    [Card.name]: Card,
    [DatePicker.name]: DatePicker,
  },
  data() {
    return {
      myTopConfiguration: {
        seletcInfoObjOne: {
          showName: "课程",
          type: "getAllCourse",
        },
      },
      myListConfiguration: {
        allType: [
          {
            dateType: "task.taskName",
            showName: "任务名",
          },
          {
            dateType: "finish",
            showName: "已做人数",
          },
          {
            dateType: "allCount",
            showName: "总人数",
          },
          {
            dateType: "task.createTime",
            showName: "发布时间时间",
          },
        ],
        //   函数
        objFn: [
          {
            type: "",
            callFn: this.detailsFn,
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
      dialogVisible: false,
      courseId: "",
    };
  },
  methods: {
    pageChangeFn(val) {
      this.nowPage = val;
      this.getTaskInfo();
    },
    sizeChangeFn(val) {
      this.pageSize = val;
      this.getTaskInfo();
    },
    deleteFn(obj) {
      this.$confirm("确定要删除任务吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteTask({
            taskId: obj.task.id,
          }).then(() => {
            this.$message({
              type: "success",
              message: "已删除",
            });
            this.getTaskInfo();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    detailsFn(obj) {
      this.$router.push({
        path: "/teacher/jobDetails",
        query: {
          id: obj.task.id,
          homeworkId: obj.task.homeworkId,
        },
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    getInfo(id) {
      this.courseId = id;
      this.getTaskInfo();
    },
    getTaskInfo() {
      getTask({
        beginIndex: this.nowPage,
        size: this.pageSize,
        courseId: this.courseId,
      })
        .then((result) => {
          this.allNums = result.data.allCount;
          this.myListConfiguration.tableData = result.data.list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {},
};
</script>

<style>
</style>