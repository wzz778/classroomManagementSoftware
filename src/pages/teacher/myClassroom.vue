<template>
  <div class="">
    <div class="addSty">
      <el-button @click="addShow" type="success">添加课程</el-button>
    </div>
    <div class="card">
      <template v-for="(item, index) in myCourse">
        <div class="cardItem" :key="index" @click="jumpDetails(item.id)">
          <div class="cardImg">
            <div class="operator">
              <button class="delBtn" @click="delFn(item.id)">删除</button>
              <button class="delBtn copyBtn" @click="copyFn(item.courseCode)">
                复制课程码
              </button>
              <button
                class="delBtn copyBtn changeBtn"
                @click="changeShow(item)"
              >
                修改
              </button>
            </div>
            <img :src="item.cover" alt="" />
          </div>
          <div class="cardInfo">
            <div class="infoText">
              <span>{{ item.courseName }}</span>
            </div>
            <div class="infoText">
              <span></span>
            </div>
            <div class="infoText">
              简介:<span class="desc">{{ item.details }}</span>
            </div>
          </div>
        </div>
      </template>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <div class="dialogSty">
        <el-form label-width="80px">
          <el-form-item label="课程名称" v-if="!isChange">
            <el-input v-model="name" clearable></el-input>
          </el-form-item>
          <el-form-item label="课程简介">
            <el-input type="textarea" v-model="desc" clearable></el-input>
          </el-form-item>
          <el-form-item label="上传图片">
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
          <el-form-item label="图片预览">
            <div class="cardImg" v-show="picSrc">
              <img :src="picSrc" alt="" />
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialogOperator">
        <el-button
          @click="handelSend"
          type="success"
          v-if="!isChange"
          :disabled="isUpload"
          >提交</el-button
        >
        <el-button
          @click="changeClass"
          type="warning"
          v-if="isChange"
          :disabled="isUpload"
          >修改</el-button
        >
        <el-button @click="dialogVisible = false" type="">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Upload } from "element-ui";
import { addCourse, myCourse, updateCover, deleteCourse } from "@/api/teacher";
export default {
  name: "myClassroom",
  data() {
    return {
      dialogVisible: false,
      fileList: [],
      picSrc: "",
      name: "",
      desc: "",
      isChange: false,
      myCourse: [],
      changeId: "",
      isUpload: false,
    };
  },
  components: {
    [Upload.name]: Upload,
  },
  methods: {
    addShow() {
      this.clearAll();
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    handelChange(file, fileList) {
      let f = new FileReader();
      f.readAsDataURL(file.raw);
      f.onload = () => {
        this.picSrc = f.result;
      };
      fileList = fileList.slice(-1);
      this.fileList = fileList;
    },
    handleRemove(file, fileList) {
      this.filesList = fileList;
      this.picSrc = "";
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    handelSend() {
      this.isUpload = true;
      // 判断是否为空值
      if (this.name.replace(/(^\s*)|(\s*$)/g, "") == "") {
        this.$message({
          message: "请输入课程名字",
          type: "warning",
        });
        this.isUpload = false;
        return;
      }
      if (this.desc.replace(/(^\s*)|(\s*$)/g, "") == "") {
        this.$message({
          message: "请输入课程简介",
          type: "warning",
        });
        this.isUpload = false;
        return;
      }
      if (this.fileList.length == 0) {
        this.$message({
          message: "请上传封面",
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
        formdata.append("cover0", this.fileList[i].raw);
      }
      formdata.append("courseName", this.name);
      formdata.append("details", this.desc);
      //   添加其他属性
      // 发送请求
      addCourse(formdata)
        .then((result) => {
          console.log(result);
          this.$message({
            message: "上传成功",
            type: "success",
          });
          this.clearAll();
          this.isUpload = false;
          this.getInfo();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeShow(obj) {
      this.dialogVisible = true;
      this.isChange = true;
      this.changeId = obj.id;
      this.desc = obj.details;
      this.fileList = [];
    },
    clearAll() {
      this.dialogVisible = false;
      this.fileList = [];
      this.picSrc = "";
      this.isChange = false;
      this.changeId = "";
      this.desc = "";
    },
    copyFn(value) {
      navigator.clipboard.writeText(value).then(() => {
        this.$message({
          message: "已复制",
          type: "success",
        });
      });
    },
    changeClass() {
      this.isUpload = true;
      if (this.fileList.length == 0) {
        this.$message({
          message: "请上传封面",
          type: "warning",
        });
        this.isUpload = false;
        return;
      }
      if (this.desc.replace(/(^\s*)|(\s*$)/g, "") == "") {
        this.$message({
          message: "请输入课程简介",
          type: "warning",
        });
        this.isUpload = false;
        return;
      }
      let formdata = new FormData();
      for (let i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].raw.type.split("/")[0] != "image") {
          this.$message({
            message: "请上传图片",
            type: "warning",
          });
          this.isUpload = false;
          return;
        }
        // 我们上传的文件保存在每个文件对象的raw里边
        formdata.append("newCover", this.fileList[i].raw);
      }
      // 修改图片
      let obj = {
        formdata: formdata,
        id: this.changeId,
        detail: this.desc,
      };
      updateCover(obj)
        .then(() => {
          this.$message({
            message: "已更新",
            type: "success",
          });
          this.getInfo();
          this.isUpload = false;
        })
        .catch((err) => {
          console.log(err);
        });
      this.clearAll();
    },
    getInfo() {
      myCourse({
        nodePage: 1,
        pageSize: 1,
      })
        .then((result) => {
          return myCourse({
            nodePage: 1,
            pageSize: result.data.total,
          });
        })
        .then((result) => {
          this.myCourse = result.data.records;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    delFn(id) {
      this.$confirm("确定要删除课程吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteCourse({ id: id }).then((result) => {
            console.log(result);
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getInfo();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    jumpDetails(id) {
      console.log(id);
      this.$router.push({
        path: "/teacher/IndexCourse",
        query: {
          id: id,
        },
      });
    },
  },
  mounted() {
    this.getInfo();
  },
};
</script>

<style scoped>
.addSty {
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

.operator {
  display: none;
  position: absolute;
  background-color: white;
  padding: 5px 10px;
  right: 0px;
  opacity: 0.9;
}

.delBtn {
  background-color: white;
  border: none;
  cursor: pointer;
  color: red;
}

.cardItem {
  cursor: pointer;
}

.cardItem:hover .operator {
  display: block;
  transform: 0.3s;
}

.dialogOperator {
  text-align: center;
}

.copyBtn {
  color: orange;
  margin-left: 20px;
}

.changeBtn {
  color: rgb(37, 134, 37);
}

.desc {
  display: inline-block;
  max-width: 170px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
  top: 4px;
  margin-left: 10px;
}
</style>