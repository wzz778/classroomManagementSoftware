<template>
  <div class="mainBox">
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="formLabelAlign"
    >
      <el-form-item label="原密码">
        <el-input
          placeholder="请输入原密码"
          v-model="formLabelAlign.oldPassword"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input
          placeholder="请输入新密码"
          v-model="formLabelAlign.newPassword"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="确认新密码">
        <el-input
          placeholder="请确认新密码"
          v-model="formLabelAlign.surePassword"
          show-password
        ></el-input>
      </el-form-item>
       <el-button class="changePasswordBtn" type="primary">修改</el-button>
    </el-form>
  </div>
</template>

<script>
import {Form,FormItem,Input,Button} from 'element-ui'
export default {
  name: "ChangePassword",
  data() {
    return {
        labelPosition: 'top',
        formLabelAlign: {
          oldPassword: '',
          newPassword: '',
          surePassword: ''
        }
    }
  },
  components:{
    [Form.name]:Form,
    [FormItem.name]:FormItem,
    [Input.name]:Input,
    [Button.name]:Button
  }
};
</script>

<style lang="less" scoped>
.mainBox{
    width: 400px;
    position: relative;
    left: 50%;
    margin-left: -200px;
    margin-top: 20px;
}

.changePasswordBtn{
    width: 200px;
    margin-left: 100px;
    margin-top: 20px;
}
</style>