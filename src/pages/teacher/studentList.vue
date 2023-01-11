<template>
  <div>
    <myTop
      :inputInfoObj="myTopConfiguration.inputInfoObj"
      :searchFn="searchFn"
      :seletcInfoObjOne="myTopConfiguration.seletcInfoObjOne"
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
        },
      },
      myListConfiguration: {
        allType: [
          {
            dateType: "grade",
            showName: "姓名",
          },
          {
            dateType: "code",
            showName: "性别",
          },
          {
            dateType: "name",
            showName: "专业",
          },
          {
            dateType: "createTime",
            showName: "班级",
          },
          {
            dateType: "createTime",
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
    };
  },
  methods: {
    pageChangeFn(val) {
      this.nowPage = val;
    },
    sizeChangeFn(val) {
      this.pageSize = val;
    },
    deleteFn(obj) {
      console.log(obj);
      this.$confirm("确定要删除班级吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
        })
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
    getAllGradeFn() {
      
    },
  },
  mounted() {
  },
};
</script>

<style>
</style>