<template>
  <div class="allPage">
    <div class="content">
      <div class="title">易学堂</div>
      <div class="contentBox">
        <div class="scrollBox" :style="{ left: len }">
          <div class="registerBox">
            <label for="inputAccount" style="margin-top: 50px">账号：</label>
            <el-input
              id="inputregisterAccount"
              class="registerInputs"
              v-model="registerInfo.newAccount"
              placeholder="请输入11位数字作为账号"
              maxlength="11"
              minlength="11"
              @keyup.native="judgeNewAccount"
            ></el-input>
            <br />
            <p :style="newAccountStyle">账号不合规范</p>
            <label for="inputPassword">密码：</label>
            <el-input
              id="inputregisterPassword"
              class="registerInputs"
              placeholder="8-15位且包含数字与字母"
              v-model="registerInfo.newPassword"
              show-password
              @keyup.native="judgeNewPassword"
            ></el-input>
            <br />
            <p :style="newPasswordStyle">密码不合规范</p>
            <label for="surePassword">确认密码：</label>
            <el-input
              id="sureRegisterPassword"
              class="registerInputs"
              placeholder="请确认密码"
              v-model="registerInfo.newSurePassword"
              show-password
              @keyup.native="judgeNewSurePassword"
            ></el-input>
            <br />
            <p :style="newSurePasswordStyle">两次密码不一致</p>
            <label for="inputEmail">邮箱：</label>
            <el-input
              id="inputRegisterEmail"
              class="registerInputs"
              placeholder="请输入邮箱"
              v-model="registerInfo.newEmail"
              @keyup.native="judgeNewEmail"
            ></el-input>
            <br />
            <p :style="newEmailStyle">邮箱不合规范</p>
            <div class="getCodeBox">
              <el-input
                id="inputRegisterCode"
                placeholder="请输入验证码"
                v-model="registerInfo.newCode"
                style="width: 200px;"
              ></el-input>
              <GetCode
                :judgeEmailRes="judgeNewEmailRes"
                :email="registerInfo.newEmail"
                :style="{width:'100px',height:'40px','margin-left':'38px'}"
              ></GetCode>
            </div>
            <el-button type="primary" class="registerBtn" @click.native="registerFun" style="height: 40px" >注册</el-button>
            <div class="rollBtns">
              <span class="toLogin" @click="len = '-500px'"
                >登录<i class="el-icon-right"></i
              ></span>
            </div>
          </div>

          <div class="loginBox">
            <label style="margin-top: 60px">账号/邮箱:</label>
            <el-input
              class="loginInputs"
              v-model="account"
              placeholder="请输入账号/邮箱"
            ></el-input>
            <label style="margin-top: 20px">密码：</label>
            <el-input
              class="loginInputs"
              placeholder="请输入密码"
              v-model="password"
              show-password
            ></el-input>
            <el-button
              type="primary"
              style="height: 40px"
              class="loginBtn"
              @click.prevent="loginFun"
              >登录</el-button
            >
            <div class="rollBtns">
              <span class="toRegisterBox" @click="len = 0"
                ><i class="el-icon-back"></i>注册</span
              >
              <span class="toForgetPasswordBox" @click="len = '-1000px'"
                >忘记密码<i class="el-icon-right"></i
              ></span>
            </div>
          </div>

          <div class="forgetPasswordBox">
            <label for="inputPassword" style="margin-top: 80px">密码：</label>
            <el-input
              id="inputforgetPassword"
              class="forgetInputs"
              placeholder="8~15位且包含数字与字母"
              v-model="forgetPassword"
              show-password
              @keyup.native="judgePassword"
            ></el-input>
            <br />
            <p :style="passwordStyle">密码不合规范</p>
            <label for="surePassword">确认密码：</label>
            <el-input
              id="forgetSurePassword"
              class="forgetInputs"
              placeholder="请确认密码"
              v-model="forgetSurePassword"
              show-password
              @keyup.native="judgeSurePassword"
            ></el-input>
            <br />
            <p :style="surePasswordStyle">两次密码输入不一致</p>
            <label for="inputEmail">邮箱：</label>
            <el-input
              id="inputforgetEmail"
              class="forgetInputs"
              placeholder="请输入邮箱"
              v-model="forgetEmail"
              @keyup.native="judgeEmail"
            ></el-input>
            <br />
            <p :style="emailStyle">邮箱格式不正确</p>
            <div class="getCodeBox">
              <el-input
                id="inputforgetCode"
                placeholder="请输入验证码"
                v-model="forgetCode"
                style="width: 200px"
              ></el-input>
              <!-- <el-button
                class="forgetGetCodeBtn"
                type="primary"
                plain
                size="small"
                @click="getCode"
                >获取验证码</el-button
              > -->
              <GetCode
                :judgeEmailRes="judgeEmailRes"
                :email="forgetEmail"
                :style="{width:'100px',height:'40px','margin-left':'38px'}"
              ></GetCode>
            </div>
            <el-button
              type="primary"
              class="forgetBtn"
              @click="forgetPasswordFun"
              style="height: 40px"
              >确认</el-button
            >
            <div class="rollBtns">
              <span class="toLogin" @click="len = '-500px'"
                ><i class="el-icon-back"></i>登录</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Input, Button, Icon, Message } from "element-ui";
import GetCode from "@/components/student/GetCode/GetCode";
import { toLogin, getCode, forgetPassword,register } from "@/api/student/yxyAxios";
import jwt_decode from "jwt-decode";
export default {
  name: "LoginPage",
  data() {
    return {
      account: "",
      password: "",
      len: "-500px",
      registerAccount: "",
      registerPassword: "",
      surePassword: "",
      registerCode: "",
      registerEmail: "",
      forgetPassword: "",
      forgetSurePassword: "",
      forgetCode: "",
      forgetEmail: "",
      registerInfo:{
        newAccount:"",
        newPassword:"",
        newEmail:"",
        newCode:""
      },
      judgeNewAccountRes:false,
      judgeNewPasswordRes: false,
      judgeNewEmailRes: false,
      judgeNewSurePasswordRes: false,
      judgePasswordRes: false,
      judgeEmailRes: false,
      judgeSurePasswordRes: false,
      // scrollLength:{
      //   left:len
      // }
      emailStyle: {
        height: 0,
      },
      surePasswordStyle: {
        height: 0,
      },
      passwordStyle: {
        height: 0,
      },
      newEmailStyle: {
        height: 0,
      },
      newSurePasswordStyle: {
        height: 0,
      },
      newPasswordStyle: {
        height: 0,
      },
      newAccountStyle: {
        height: 0,
      },
    };
  },
  components: {
    [Input.name]: Input,
    [Button.name]: Button,
    [Icon.name]: Icon,
    GetCode,
  },
  methods: {
    registerFun(){
      if(this.judgeNewAccountRes==false){
        Message.warning("账号不合规范");
      }else if(this.judgeNewPasswordRes==false){
        Message.warning("密码不合规范");
      }else if(this.judgeNewSurePasswordRes==false){
        Message.warning("两次密码输入不一样");
      }else if(this.judgeNewEmailRes==false){
        Message.warning("邮箱不合规范");
      }else if(this.registerInfo.newCode.replace('/ /g',"")==""){
        Message.warning("请输入验证码");
      }else{
        let data={
          code:this.registerInfo.newCode,
          email:this.registerInfo.newEmail,
          password:this.registerInfo.newPassword,
          username:this.registerInfo.newAccount
        }
        register(data).then(res=>{
          if(res.msg=='账号或邮箱已存在'){
            Message.error("账号或邮箱已存在");
          }else if(res.status==200){
            Message.success("注册成功");
          }else{
            Message.error("网络异常，注册失败");
          }
        }).catch(err=>{
          console.log(err);
          Message.error("网络异常，注册失败");
        })
      }
    },
    loginFun() {
      let data = {
        username: this.account,
        password: this.password,
      };
      toLogin(data).then((res) => {
        if (res.status == 200) {
          Message.success("登录成功！");
          this.$store.commit("GETTOKEN", res.data);
          let personInfo = jwt_decode(res.data);
          if (personInfo.power == 0) {
            this.$router.push("/user/IndexBase");
          }
          if (personInfo.power == 1) {
            this.$router.push("/teacher/myClassroom");
          }
          if (personInfo.power == 2) {
            this.$router.push("/admin/index");
          }
        } else {
          Message.error("登录失败,请检查账号/邮箱、密码是否正确！");
        }
      }).catch(err=>{
        Message.error("网络异常，登录失败！")
      });
    },
    judgeNewAccount(){
      let accountReg=/^\d{11}$/;
      let judgeRes=accountReg.test(this.registerInfo.newAccount);
      if(judgeRes==false){
        this.judgeNewAccountRes=false;
        this.newAccountStyle.height='16px';
      }else{
        this.judgeNewAccountRes=true;
        this.newAccountStyle.height='0';
      }
    },
    judgeNewPassword() {
      let passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,15}$/;
      let judgeRes = passwordReg.test(this.registerInfo.newPassword);
      if (judgeRes == false) {
        this.newPasswordStyle.height="16px";
        this.judgeNewPasswordRes = false;
      } else {
        this.newPasswordStyle.height='0'
        this.judgeNewPasswordRes = true;
      }
    },
    judgeNewSurePassword() {
      if (this.registerInfo.newPassword != this.registerInfo.newSurePassword) {
        this.newSurePasswordStyle.height= "16px";
        this.judgeNewSurePasswordRes = false;
      } else {
        this.newSurePasswordStyle.height="0";
        this.judgeNewSurePasswordRes = true;
      }
    },
    judgeNewEmail() {
      let EmailReg =
        /^[0-9A-Za-z_]+([-+.][0-9A-Za-z_]+)*@[0-9A-Za-z_]+([-.][0-9A-Za-z_]+)*\.[0-9A-Za-z_]+([-.][0-9A-Za-z_]+)*$/;
      if (EmailReg.test(this.registerInfo.newEmail) == false) {
        this.newEmailStyle.height= "16px";
        this.judgeNewEmailRes = false;
      } else {
        this.newEmailStyle.height= "0";
        this.judgeNewEmailRes = true;
      }
    },
    judgePassword() {
      let passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,15}$/;
      let judgeRes = passwordReg.test(this.forgetPassword);
      if (judgeRes == false) {
        this.passwordStyle = {
          height: "16px",
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
      if (this.forgetPassword != this.forgetSurePassword) {
        this.surePasswordStyle = {
          height: "16px",
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
      if (EmailReg.test(this.forgetEmail) == false) {
        this.emailStyle = {
          height: "16px",
        };
        this.judgeEmailRes = false;
      } else {
        this.emailStyle = {
          height: "0",
        };
        this.judgeEmailRes = true;
      }
    },
    getCode() {
      if (this.forgetEmail == "") {
        Message.warning("请填写邮箱！");
      } else if (this.judgeEmailRes == false) {
        Message.warning("邮箱格式不合规范，请重新填写！");
      } else {
        let data = {
          email: this.forgetEmail,
        };
        getCode(data).then((res) => {
          if (res.status == 200) {
            Message.success("获取成功！");
          } else {
            Message.error("发送失败，请检查邮箱是否正确！");
          }
        }).catch(err=>{
          console.log(err);
          Message.error("网络异常，发送失败！");
        });
      }
    },
    forgetPasswordFun() {
      if (this.judgePasswordRes == false) {
        Message.warning("密码不合规范！");
      } else if (this.judgeSurePasswordRes == false) {
        Message.warning("密码输入不一致！");
      } else if (this.judgeEmailRes == false) {
        Message.warning("邮箱不合规范！");
      } else {
        let data = {
          email: this.forgetEmail,
          code: this.forgetCode,
          newPassword: this.forgetPassword,
        };
        forgetPassword(data).then((res) => {
          if (res.status == 200) {
            Message.success("修改成功！");
          } else {
            Message.error("网络异常，修改失败！");
          }
        });
      }
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
}
html {
  display: block;
  width: 100%;
  height: 100%;
}
body {
  width: 100%;
  height: 100%;
}
.allPage {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-image: url(@/assets/yxy/loginBg.jpg);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

.content {
  position: relative;
  width: 500px;
  height: 420px;
}

.contentBox {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
}

.title {
  position: absolute;
  width: 260px;
  height: 50px;
  top: -25px;
  left: 120px;
  text-align: center;
  line-height: 50px;
  background-color: #fff;
  color: cornflowerblue;
  border: 2px dotted cornflowerblue;
  font-size: 20px;
  font-weight: 700;
  border-radius: 10px;
  z-index: 99;
  overflow: hidden;
}

// .toLogin{
//   display: inline-block;
//   width: 60%;
//   height: 100%;
//   text-align: center;
//   border-radius: 30px;
//   background-color: cornflowerblue;
//   color: #fff;
//   transition: all .3s;
// }

// .toRegister{
//   display: inline-block;
//   width: 40%;
//   height: 100%;
//   text-align: center;
//   border-radius: 30px;
//   background-color: #fff;
//   color: cornflowerblue;
//   transition: all .3s;
// }
.scrollBox {
  display: flex;
  width: 1500px;
  position: absolute;
  transition: all 1s;
}

.loginBox,
.registerBox,
.forgetPasswordBox {
  display: inline-block;
  width: 500px;
  height: 420px;
  background-color: #fff;
}
.forgetPasswordBox {
  background-color: chocolate;
}
.loginBox {
  display: flex;
  flex-direction: column;
  label {
    font-size: 14px;
    color: cornflowerblue;
    margin-left: 120px;
  }
  .loginInputs {
    width: 260px;
    margin-left: 120px;
    margin-top: 10px;
  }
}
.loginBtn {
  width: 260px;
  margin-top: 30px;
  margin-left: 120px;
  cursor: pointer;
}
.rollBtns {
  display: inline-block;
  width: 500px;
  margin-top: 10px;
  color: cornflowerblue;
  font-size: 15px;
  position: absolute;
  bottom: 18px;
  .toRegisterBox {
    float: left;
    margin-left: 20px;
    cursor: pointer;
  }
  .toForgetPasswordBox {
    float: right;
    margin-right: 20px;
    cursor: pointer;
  }
}
.registerBox {
  background-color: #fff;
  #inputAccount {
    margin-top: 50px;
  }
  label {
    display: inline-block;
    width: 80px;
    font-size: 14px;
    color: cornflowerblue;
    margin-left: 80px;
    margin-top: 10px;
  }
  .getCodeBox {
    display: inline-block;
    width: 340px;
    margin-left: 80px;
    margin-top: 10px;
  }
  .toLogin {
    float: right;
    margin-right: 20px;
    cursor: pointer;
  }
}
// #inputCode {
//   display: inline-block;
//   width: 200px;
// }
.getRegisterCodeBtn {
  display: inline-block;
  margin-left: 20px;
}

.registerBtn {
  display: block;
  width: 260px;
  margin-top: 15px;
  margin-left: 120px;
  cursor: pointer;
}
.registerInputs {
  display: inline-block;
  width: 260px;
  margin-top: 10px;
}

.forgetPasswordBox {
  background-color: #fff;
  #forgetPassword {
    margin-top: 60px;
  }
  label {
    display: inline-block;
    width: 80px;
    font-size: 14px;
    color: cornflowerblue;
    margin-left: 80px;
    margin-top: 15px;
  }
  .getCodeBox {
    display: inline-block;
    width: 340px;
    margin-left: 80px;
    margin-top: 15px;
  }
  .toLogin {
    float: left;
    margin-left: 20px;
    cursor: pointer;
  }
}
// #inputCode {
//   display: inline-block;
//   width: 200px;
// }
.forgetGetCodeBtn {
  display: inline-block;
  margin-left: 20px;
}

.forgetBtn {
  display: block;
  width: 260px;
  margin-top: 20px;
  margin-left: 120px;
  cursor: pointer;
}
.forgetInputs {
  display: inline-block;
  width: 260px;
  margin-top: 15px;
}

p {
  line-height: 16px;
  font-size: 12px;
  color: red;
  text-align: center;
  transition: all 0.3s;
  overflow: hidden;
}
</style>
