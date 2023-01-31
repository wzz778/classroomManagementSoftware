<template>
  <div>
    <myTop
      :inputInfoObj="myTopConfiguration.inputInfoObj"
      :searchFn="searchFn"
      :seletcInfoObjOne="myTopConfiguration.seletcInfoObjOne"
      :getInfo="getInfo"
      :buttonInfo="myTopConfiguration.buttonInfo"
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
import {
  courseStudents,
  deleteStudentFromCourse,
  resetPassword,
} from "@/api/teacher";
export default {
  name: "StudentList",
  components: {
    myPaging,
    myList,
    myTop,
  },
  data() {
    return {
      myTopConfiguration: {
        seletcInfoObjOne: {
          showName: "班级",
          type: "getAllGradeFn",
        },
      },
      myListConfiguration: {
        allType: [
          {
            dateType: "userName",
            showName: "姓名",
          },
          {
            dateType: "sex",
            showName: "性别",
          },
          {
            dateType: "email",
            showName: "邮箱",
          },
          {
            dateType: "nativePlace",
            showName: "籍贯",
          },
          {
            dateType: "createTime",
            showName: "上学期成绩",
          },
        ],
        //   函数
        objFn: [
          {
            type: "",
            callFn: this.resetPassword,
            showInfo: "重置密码",
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
      classId: "",
    };
  },
  methods: {
    pageChangeFn(val) {
      this.nowPage = val;
      this.getStudentInfo();
    },
    sizeChangeFn(val) {
      this.pageSize = val;
      this.getStudentInfo();
    },
    deleteFn(obj) {
      this.$confirm("确定要删除班级吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteStudentFromCourse({
            courseId: this.classId,
            studentId: obj.studentId,
          }).then((result) => {
            console.log("移除课程", result);
            this.$message({
              message: "已移除",
              type: "success",
            });
            this.getStudentInfo();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    resetPassword(obj) {
      resetPassword({
        id: obj.studentId,
      })
        .then((result) => {
          this.$message({
            message: "已重置,初始密码为：123456",
            type: "success",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchFn(obj) {
      this.searchObj = obj;
    },
    getInfo(id) {
      this.classId = id;
      this.pageSize = 10;
      this.allNums = 0;
      this.nowPage = 1;
      this.getStudentInfo();
    },
    getStudentInfo() {
      courseStudents({
        classId: this.classId,
        nodePage: this.nowPage,
        pageSize: this.pageSize,
      })
        .then((result) => {
          this.myListConfiguration.tableData = result.data.records;
          this.allNums = result.data.total;
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