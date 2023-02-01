<template>
  <div>
    <div class="top">
      <el-row>
        <el-col :span="6">
          <el-form label-width="80px">
            <el-form-item label="课程:">
              <el-select v-model="searchCourseId">
                <el-option
                  v-for="(item, index) in gradeArr"
                  :key="index"
                  :label="item.courseName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="4">
          <el-button
            size="small"
            type="primary"
            @click="addFn"
            style="padding: 14px"
            >上传附件</el-button
          >
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <div class="dialogSty">
        <el-form label-width="80px">
          <el-form-item label="文件名称">
            <el-input
              v-model="fileName"
              placeholder="请输入内容"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="课程">
            <el-select
              v-model="fileCourseId"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="(item, index) in gradeArr"
                :key="index"
                :label="item.courseName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传文件">
            <el-upload
              class="upload-demo"
              ref="upload"
              action=""
              :on-remove="handleRemove"
              :file-list="fileList"
              :on-change="handelChange"
              name="cover"
              :auto-upload="false"
            >
              <el-button slot="trigger" size="small" type="primary"
                >选取文件</el-button
              >
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialogOperator">
        <el-button @click="handelSend" :disabled="isUpload" type="success"
          >提交</el-button
        >
        <el-button @click="dialogVisible = false" type="">取消</el-button>
      </div>
    </el-dialog>
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
import { Upload } from "element-ui";
import { myCourse, uploadFile, getFiles } from "@/api/teacher";
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
            dateType: "fileName",
            showName: "文件名",
          },
          {
            dateType: "createTime",
            showName: "发布时间",
          },
        ],
        //   函数
        objFn: [
          {
            type: "danger",
            callFn: this.deleteFn,
            showInfo: "删除",
          },
          {
            type: "",
            callFn: this.dowmLoadFn,
            showInfo: "下载",
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
      fileList: [],
      fileName: "",
      gradeArr: [],
      fileCourseId: "",
      searchCourseId: "",
      isUpload: false,
    };
  },
  methods: {
    handelChange(file, fileList) {
      fileList = fileList.slice(-1);
      this.fileList = fileList;
    },
    handleRemove(file, fileList) {
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
      this.isUpload = true;
      // 判断是否为空值
      if (this.fileName.replace(/(^\s*)|(\s*$)/g, "") == "") {
        this.$message({
          message: "请输入文件名字",
          type: "warning",
        });
        this.isUpload = false;
        return;
      }
      if (this.fileCourseId == "") {
        this.$message({
          message: "请选择课程",
          type: "warning",
        });
        this.isUpload = false;
        return;
      }
      if (this.fileList.length == 0) {
        this.$message({
          message: "请上传文件",
          type: "warning",
        });
        this.isUpload = false;
        return;
      }
      //   这里需要判断一下文件大小或者类型
      //   自定义上传就需要我们使用fromdata对象来上传文件
      let formdata = new FormData();
      for (let i = 0; i < this.fileList.length; i++) {
        // 我们上传的文件保存在每个文件对象的raw里边
        formdata.append("fileAddress", this.fileList[i].raw);
      }
      formdata.append("fileName", this.fileName);
      formdata.append("courseId", this.fileCourseId);
      //   添加其他属性
      // 发送请求
      uploadFile(formdata)
        .then(() => {
          this.$message({
            message: "上传成功",
            type: "success",
          });
          this.clearAll();
          this.dialogVisible = false;
          this.isUpload = false;
          this.getInfo();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    clearAll() {
      this.fileList = [];
      this.fileName = "";
      this.fileCourseId = "";
    },
    pageChangeFn(val) {
      this.nowPage = val;
      this.getInfo();
    },
    sizeChangeFn(val) {
      this.pageSize = val;
      this.getInfo();
    },
    deleteFn(obj) {
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
    getAllCourse() {
      myCourse({})
        .then((result) => {
          this.gradeArr = result.data.records;
          this.searchCourseId = this.gradeArr[0].id;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getInfo() {
      getFiles({
        courseId: this.searchCourseId,
        nodePage: this.nowPage,
        pageSize: this.pageSize,
      })
        .then((result) => {
          this.allNums = result.data.total;
          this.myListConfiguration.tableData = result.data.records;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    dowmLoadFn(obj) {
      console.log(obj);
      this.downfile2(obj.fileAddress, obj.fileName);
    },
    //运行时调用downfile2函数就行第一个参数是下载的地址，第二个是文件名
    downfile2(url, name2) {
      let filename2 = url;
      let fileUrl = `${filename2}`;
      let houzhui = getExtension(filename2);
      //获取下载文件的后缀
      function getExtension(name) {
        return name.substring(name.lastIndexOf("."));
      }
      this.getBlob(fileUrl).then((blob) => {
        // saveas(fig,filename) 将 fig 指定的图窗或 Simulink 模块图保存到 filename 文件中。将文件名指定为字符向量或字符串，包括文件扩展名，例如 'myplot.jpg'。文件扩展名用于定义文件格式
        this.saveAs(blob, `${name2}${houzhui}`);
      });
    },
    // 第一步，要先通过当前url 取得 blob 对象（必须）
    getBlob(url) {
      return new Promise((resolve) => {
        // axios 中的 axios.get()、axios.post()、axios() 方法，都是基于 XMLHttpRequest（简称：XHR） 封装
        const xhr = new XMLHttpRequest();
        /*  调用 open 并不会真正发送请求，而只是做好发送请求的准备工作*/
        xhr.open("GET", url, true);
        xhr.responseType = "blob";
        // 监听 load 事件,发送完如果成功将得到的对象传给saveAs
        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(xhr.response); // 转为blob 请求类型类型
          }
        };
        //调用 send() 正式发送请求
        xhr.send();
      });
    },
    saveAs(blob, filename) {
      var link = document.createElement("a"); // 创建a标签
      link.href = window.URL.createObjectURL(blob); // 获取blob 下载url
      link.download = filename; //自定义文件名
      link.click(); // 点击下载
    },
  },
  watch: {
    searchCourseId() {
      this.getInfo();
    },
  },
  mounted() {
    this.getAllCourse();
  },
};
</script>

<style scped>
.top {
  margin-bottom: 20px;
}

.card {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 30px;
  grid-row-gap: 30px;
}

.cardImg {
  position: relative;
  width: 240px;
  height: 130px;
  background-size: cover;
}

.cardImg > img {
  width: 100%;
  height: 100%;
}

.dialogOperator {
  text-align: center;
}
</style>