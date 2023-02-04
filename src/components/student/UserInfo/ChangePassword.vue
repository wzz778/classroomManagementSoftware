<template>
  <div class="mainBox" >
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="changePasswordInfo"
    >
      <el-form-item label="新密码:" style="margin-bottom=0;height:90px" >
        <el-input
          placeholder="8~15位且包含数字与字母"
          v-model="changePasswordInfo.newPassword"
          show-password
          @keyup.native="judgePassword"
        ></el-input>
        <span :style="passwordStyle" class="tips">新密码格式不正确</span>
      </el-form-item>
      <el-form-item label="确认新密码:" style="margin-bottom=0;height:90px">
        <el-input
          placeholder="请确认新密码"
          v-model="surePassword"
          show-password
          @keyup.native="judgeSurePassword"
        ></el-input>
        <span :style="surePasswordStyle" class="tips">两次密码输入不一致</span>
      </el-form-item>
      <el-form-item label="邮箱:" style="margin-bottom=0;height:90px">
        <el-input
          placeholder="请输入账号绑定的邮箱"
          v-model="changePasswordInfo.email"
          @keyup.native="judgeEmail"
        ></el-input>
        <span class="tips">邮箱格式不正确</span>
      </el-form-item>
      <div class="codeBox">
        <el-input
          v-model="changePasswordInfo.code"
          placeholder="验证码"
          id="inputCode"
          style="width: 200px;margin-top:20px"
        ></el-input>
        <GetCode style="margin-top:20px" :judgeEmailRes=judgeEmailRes :email=changePasswordInfo.email></GetCode>
        <!-- <el-button type="primary" size="mini" plain @click="getCode"
          >获取验证码</el-button
        > -->
      </div>
      <el-button class="changePasswordBtn" type="primary" @click="updatePasswordFun">修改</el-button>
    </el-form>
  </div>
</template>

<script>
import { Message } from "element-ui";
import {updatePassword} from '@/api/student/yxyAxios'
import GetCode from '@/components/student/GetCode/GetCode'
export default {
  name: "ChangePassword",
  data() {
    return {
      labelPosition: "top",
      changePasswordInfo: {
        email: "",
        newPassword: "",
        code: "",
      },
      surePassword: "",
      judgePasswordRes: false,
      judgeEmailRes: false,
      judgeSurePasswordRes: false,
      passwordStyle: {
        height: 0,
      },
      surePasswordStyle: {
        height: 0,
      },
    };
  },
  components:{
    GetCode
  },
  methods: {
    judgePassword() {
      let passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,15}$/;
      let judgeRes = passwordReg.test(this.changePasswordInfo.newPassword);
      if (judgeRes == false) {
        this.passwordStyle = {
          height: "25px",
        };
        this.judgePasswordRes = false;
      } else {
        this.passwordStyle = {
          height: "0",
        };
        this.judgePasswordRes = true;
      }
    },
    judgeSurePassword() {
      if (
        this.surePassword !=
        this.changePasswordInfo.newPassword
      ) {
        this.surePasswordStyle = {
          height: "25px",
        };
        this.judgeSurePasswordRes = false;
      } else {
        this.surePasswordStyle = {
          height: "0",
        };
        this.judgeSurePasswordRes = true;
      }
    },
    judgeEmail() {
      let EmailReg =
        /^[0-9A-Za-z_]+([-+.][0-9A-Za-z_]+)*@[0-9A-Za-z_]+([-.][0-9A-Za-z_]+)*\.[0-9A-Za-z_]+([-.][0-9A-Za-z_]+)*$/;
      if (EmailReg.test(this.changePasswordInfo.email) == false) {
        this.emailStyle = {
          height: "25px",
        };
        this.judgeEmailRes = false;
      } else {
        this.emailStyle = {
          height: "0",
        };
        this.judgeEmailRes = true;
      }
    },
    // getCode() {
    //   if (this.changePasswordInfo.email == "") {
    //     Message.warning("请填写邮箱！");
    //   } else if (this.judgeEmailRes == false) {
    //     Message.warning("邮箱格式不合规范，请重新填写！");
    //   } else {
    //     let data = {
    //       email: this.changePasswordInfo.email,
    //     };
    //     getCode(data).then((res) => {
    //       if (res.status == 200) {
    //         Message.success("获取成功！");
    //       } else {
    //         Message.error("网络异常，发送失败！");
    //       }
    //     });
    //   }
    // },
    updatePasswordFun() {
      if (this.judgePasswordRes == false) {
        Message.warning("密码不合规范！");
      } else if (this.judgeSurePasswordRes == false) {
        Message.warning("密码输入不一致！");
      } else if (this.judgeEmailRes == false) {
        Message.warning("邮箱不合规范！");
      } else {
        let data=this.changePasswordInfo
        updatePassword(data).then((res) => {
          if(res.status==200){
            Message.success("修改成功！")
          }else{
            Message.error("网络异常，修改失败！")
          }
        });
      }
    },
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

.changePasswordBtn {
  width: 200px;
  margin-left: 100px;
  margin-top: 20px;
}
.codeBox {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.tips {
  display: inline-block;
  width: 100%;
  height: 25px;
  line-height: 25px;
  font-size: 14px;
  color: red;
  text-align: center;
  overflow: hidden;
  transition: all 0.2s;
}
</style>