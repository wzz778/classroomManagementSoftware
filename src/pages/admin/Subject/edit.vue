<template>
  <div id="adminindex">
    <el-form
      label-position="right"
      :rules="rules"
      label-width="100px"
      :model="form"
      ref="form"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item  label="信息内容" prop="content">
        <el-input type="textarea"  v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item style="width:300px;" label="用户Id" prop="uId">
        <el-input v-model="form.uId"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { Input} from "element-ui";
export default {
  name: "UsersEdit",
  components: {
    [Input.name]: Input,
  },
  data() {
    return {
      labelPosition: "right",
      form: {
        title: "",
        content: "",
        uId:""
      },
      rules: {
        title: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" },
        ],
        content: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 1, max: 300, message: "长度在 1 到 300 个字符", trigger: "blur" },
        ],
       uId: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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