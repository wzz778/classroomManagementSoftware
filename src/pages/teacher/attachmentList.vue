<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      action=""
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :on-change="handelChange"
      name="cover"
      :auto-upload="false"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    </el-upload>
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
        <el-form-item label="添加作业:">
          <el-input
            v-model="className"
            placeholder="请输入"
            clearable
          ></el-input>
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
import { Upload } from "element-ui";
export default {
  name: "attachmentList",
  components: {
    myPaging,
    myList,
    [Upload.name]: Upload,
  },
  data() {
    return {
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
      fileList: [],
    };
  },
  methods: {
    handelChange(file, fileList) {
      let f = new FileReader();
      f.readAsDataURL(file.raw);
      f.onload = () => {
        this.picSrc = f.result;
      };
      fileList = fileList.slice(-1);
      this.fileList = fileList;
      console.log("文件修改执行的函数", file, fileList);
    },
    handleRemove(file, fileList) {
      console.log("移除文件执行的函数", file, fileList);
      this.filesList = fileList;
      this.picSrc = "";
    },
    handlePreview(file) {
      console.log("点击已经上传的文件", file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      console.log("移除之前执行的函数", fileList);
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handelSend() {
      console.log("上传文件", this.fileList);
      //   这里需要判断一下文件大小或者类型
      //   自定义上传就需要我们使用fromdata对象来上传文件
      let formdata = new FormData();
      for (let i = 0; i < this.fileList.length; i++) {
        // 我们上传的文件保存在每个文件对象的raw里边
        formdata.append("file", this.fileList[i].raw);
      }
      //   添加其他属性
      // 发送请求
    },
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
    submitFn() {},
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
  },
  mounted() {},
};
</script>

<style>
</style>