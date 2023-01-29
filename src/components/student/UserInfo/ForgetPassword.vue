<template>
  <div class="mainBox">
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="forgetPasswordInfo"
    >
      <el-form-item label="新密码">
        <el-input
          placeholder="请输入新密码"
          v-model="forgetPasswordInfo.newPassword"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="确认新密码">
        <el-input
          placeholder="请确认新密码"
          v-model="forgetPasswordInfo.surePassword"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input
          placeholder="请输入账号绑定的邮箱"
          v-model="forgetPasswordInfo.email"
        ></el-input>
      </el-form-item>
      <div class="codeBox">
        <el-input
          v-model="forgetPasswordInfo.code"
          placeholder="验证码"
          id="inputCode"
          style="width:200px"
        ></el-input>
         <el-button type="primary" size="mini" plain>获取验证码</el-button>
      </div>
      <el-button class="forgetPasswordBtn" type="primary">修改</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "ForgetPassword",
  data() {
    return {
      labelPosition: "top",
      forgetPasswordInfo: {
        email: "",
        newPassword: "",
        surePassword: "",
        code: "",
      },
    };
  },
};
</script>

<style lang="less" scoped>
.mainBox {
  width: 400px;
  position: relative;
  left: 50%;
  margin-left: -200px;
  margin-top: 20px;
}

.forgetPasswordBtn {
  width: 200px;
  margin-left: 100px;
  margin-top: 20px;
}
.codeBox {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>