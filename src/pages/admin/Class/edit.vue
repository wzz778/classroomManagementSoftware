<template>
  <div id="adminindex">
    <el-form
      label-position="right"
      :rules="rules"
      label-width="100px"
      :model="form"
      ref="form"
    >
      <el-form-item label="班级名" prop="title">
        <el-input v-model.trim="form.title"></el-input>
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
import {createGrade} from '@/api/admin/index'
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
      },
      rules: {
        title: [
          { required: true, message: "请输入班级名称", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          createGrade({className:this.form.title})
          .then((result) => {
            console.log(result);
            if(result.status==200){
            this.$alert(`课程码：${result.data}`, '创建成功', {
              confirmButtonText: '复制课程码',
              callback: action => {
                navigator.clipboard.writeText(result.data).then(() => {
                  this.$message({
                    message: "已复制",
                    type: "success",
                  });
                });
              }
            });
              this.form.title=""
            }else{
              this.$message({
                type: "warning",
                message: "操作失败",
              });
            }
          })
          .catch((err) => {
            console.log(err);
              this.$message({
                type: "warning",
                message: "操作失败",
              });
          })
        } else {
          // console.log("error submit!!");
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
  padding-top: 10px;
  .el-textarea__inner{
    min-height: 300px;
  }
}
</style>    