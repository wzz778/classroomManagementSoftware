<template>
  <div id="adminindex">
    <el-form
      label-position="right"
      :rules="rules"
      label-width="100px"
      :model="form"
      ref="form"
    >
      <el-form-item label="课堂名称" prop="courseName">
        <el-input v-model.trim="form.courseName" clearable></el-input>
      </el-form-item>
      <el-form-item  label="课堂简介" prop="details">
        <el-input type="textarea"  v-model.trim="form.details" clearable></el-input>
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
          <img style="height: 200px;" :src="picSrc" alt="" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handelSend('form')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { Upload } from "element-ui";
import {addCourse} from "@/api/admin";
export default {
  components: {
    [Upload.name]: Upload,
  },
  name: "SubjectEdit",
  data() {
    return {
      labelPosition: "right",
      form: {
        courseName: "",
        details: "",
        
      },
      fileList: [],
      rules: {
        courseName: [
          { required: true, message: "请输入课堂名称", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" },
        ],
        details: [
          { required: true, message: "请输入课堂简介", trigger: "blur" },
          { min: 5, max: 200, message: "长度在 5 到 200 个字符", trigger: "blur" },
        ],
      },
      picSrc: "",
    };
  },
  methods: {
    onSubmit() {
      // console.log("submit!");
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.fileList = [];
      this.picSrc = "";
    },
    handelChange(file, fileList) {
      // console.log(file);
      // console.log(fileList);
      let f = new FileReader();
      f.readAsDataURL(file.raw);
      f.onload = () => {
        this.picSrc = f.result;
      };
      fileList = fileList.slice(-1);
      this.fileList = fileList;
    },
    handleRemove(file, fileList) {
      // console.log(fileList);
      this.fileList = fileList;
      this.picSrc = "";
    },
    handelSend(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid)  {
          //判断是否为空值
          if (this.fileList.length == 0) {   
            this.$message({
              message: "请上传封面",
              type: "warning",
            });
            return;
          }
          //   这里需要判断一下文件大小或者类型
          //   自定义上传就需要我们使用fromdata对象来上传文件
          let formdata = new FormData();
          // console.log(this.fileList);
          for (let i = 0; i < this.fileList.length; i++) {
            // 我们上传的文件保存在每个文件对象的raw里边
            formdata.append("cover0", this.fileList[i].raw);
          }
          formdata.append("courseName", this.form.courseName);
          formdata.append("details", this.form.details);
          //   添加其他属性
          // 发送请求
          addCourse(formdata)
            .then((result) => {
              if(result.status==200){
                this.$message({
                  message: "创建成功",
                  type: "success",
                });
                this.$refs['form'].resetFields();
                this.fileList = [];
                this.picSrc = "";
              }else{
                this.$message({
                  type: "warning",
                  message: "操作失败",
                });
              }
            })
            .catch((err) => {
              // console.log(err);
            });
        }else{
          // console.log("error");
        }
        })
    },
  },
};
</script>
<style lang="less" scoped>
#adminindex {
  width: 100%;
  min-height: 500px;
  // background-color:#3BCA55;
  .el-textarea__inner{
    min-height: 300px;
  }
}
</style>