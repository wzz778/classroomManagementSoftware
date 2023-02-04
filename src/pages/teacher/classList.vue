<template>
  <div>
    <myTop
      :inputInfoObj="myTopConfiguration.inputInfoObj"
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
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      :append-to-body="true"
    >
      <el-form label-width="80px">
        <el-form-item label="班级名称:">
          <el-input
            v-model="className"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeFn" v-if="isChange"
          >修改</el-button
        >
        <el-button type="primary" @click="submitFn" v-if="!isChange"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import myPaging from "@/components/teacher/utilComponents/myPaging.vue";
import myList from "@/components/teacher/utilComponents/myList.vue";
import myTop from "@/components/teacher/utilComponents/myTop.vue";
import { createGrade, getGrade, updateGrade, deleteGrade } from "@/api/teacher";
export default {
  name: "classList",
  components: {
    myPaging,
    myList,
    myTop,
  },
  data() {
    return {
      myTopConfiguration: {
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
            dateType: "className",
            showName: "班级名称",
          },
          {
            dateType: "code",
            showName: "班级口令",
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
            showInfo: "修改",
          },
          {
            type: "danger",
            callFn: this.deleteFn,
            showInfo: "删除",
          },
          {
            type: "success",
            callFn: this.copyFn,
            showInfo: "复制",
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
      isChange: false,
      id: "",
    };
  },
  methods: {
    pageChangeFn(val) {
      this.nowPage = val;
      this.getInfo();
    },
    sizeChangeFn(val) {
      this.pageSize = val;
      this.getInfo();
    },
    judgePrevious() {
      if (this.myListConfiguration.tableData.length == 1 && this.nowPage == 1) {
        this.myListConfiguration.tableData = [];
        return;
      }
      this.nowPage--;
      this.getInfo();
    },
    deleteFn(obj) {
      this.$confirm("确定要删除班级吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteGrade({
            gradeId: obj.id,
          })
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.judgePrevious();
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
      this.className = obj.className;
      this.id = obj.id;
      this.isChange = true;
      this.dialogVisible = true;
    },
    submitFn() {
      if (this.className.replace(/(^\s*)|(\s*$)/g, "") == "") {
        this.$message({
          message: "请输入班级名称",
          type: "warning",
        });
        return;
      }
      createGrade({
        className: this.className,
      })
        .then(() => {
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.dialogVisible = false;
          this.getInfo();
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
    // 添加
    addFn() {
      this.className = "";
      this.id = "";
      this.isChange = false;
      this.dialogVisible = true;
    },
    // 复制
    copyFn(data) {
      navigator.clipboard.writeText(data.code).then(() => {
        this.$message({
          message: "班级口令已复制",
          type: "success",
        });
      });
    },
    // 修改
    changeFn() {
      if (this.className.replace(/(^\s*)|(\s*$)/g, "") == "") {
        this.$message({
          message: "请输入班级名称",
          type: "warning",
        });
        return;
      }
      updateGrade({
        className: this.className,
        id: this.id,
      })
        .then(() => {
          this.dialogVisible = false;
          this.getInfo();
          this.$message({
            message: "修改成功",
            type: "success",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取信息
    getInfo() {
      getGrade({
        beginIndex: this.nowPage,
        size: this.pageSize,
      })
        .then((result) => {
          this.allNums = result.data.total;
          this.myListConfiguration.tableData = result.data.records;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getInfo();
  },
};
</script>

<style>
</style>