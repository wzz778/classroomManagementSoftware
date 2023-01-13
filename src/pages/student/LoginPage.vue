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
              v-model="registerAccount"
              placeholder="请输入账号"
            ></el-input>
            <br />
            <label for="inputPassword">密码：</label>
            <el-input
              id="inputregisterPassword"
              class="registerInputs"
              placeholder="请输入密码"
              v-model="registerPassword"
              show-password
            ></el-input>
            <br />
            <label for="surePassword">确认密码：</label>
            <el-input
              id="sureRegisterPassword"
              class="registerInputs"
              placeholder="请确认密码"
              v-model="surePassword"
              show-password
            ></el-input>
            <br />
            <label for="inputEmail">邮箱：</label>
            <el-input
              id="inputRegisterEmail"
              class="registerInputs"
              placeholder="请输入邮箱"
              v-model="registerEmail"
            ></el-input>
            <br />
            <div class="getCodeBox">
              <el-input
                id="inputRegisterCode"
                placeholder="请输入验证码"
                v-model="registerCode"
                style="width: 200px;"
              ></el-input>
              <el-button class="getRegisterCodeBtn" type="primary" size="small"
                >获取验证码</el-button
              >
            </div>
            <el-button type="primary" class="registerBtn">注册</el-button>
            <div class="rollBtns">
              <span class="toLogin" @click="len = '-500px'"
                >登录<i class="el-icon-right"></i
              ></span>
            </div>
          </div>

          <div class="loginBox">
            <label style="margin-top: 60px">账号:</label>
            <el-input
              class="loginInputs"
              v-model="account"
              placeholder="请输入账号"
            ></el-input>
            <label style="margin-top: 20px">密码：</label>
            <el-input
              class="loginInputs"
              placeholder="请输入密码"
              v-model="password"
              show-password
            ></el-input>
            <el-button type="primary" class="loginBtn">登录</el-button>
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
            <label for="inputPassword" style="margin-top: 60px;">密码：</label>
            <el-input
              id="inputforgetPassword"
              class="forgetInputs"
              placeholder="请输入密码"
              v-model="forgetPassword"
              show-password
            ></el-input>
            <br />
            <label for="surePassword">确认密码：</label>
            <el-input
              id="forgetSurePassword"
              class="forgetInputs"
              placeholder="请确认密码"
              v-model="forgetSurePassword"
              show-password
            ></el-input>
            <br />
            <label for="inputEmail">邮箱：</label>
            <el-input
              id="inputforgetEmail"
              class="forgetInputs"
              placeholder="请输入邮箱"
              v-model="forgetEmail"
            ></el-input>
            <br />
            <div class="getCodeBox">
              <el-input
                id="inputforgetCode"
                placeholder="请输入验证码"
                v-model="forgetCode"
                style="width: 200px;"
              ></el-input>
              <el-button class="forgetGetCodeBtn" type="primary" size="small"
                >获取验证码</el-button
              >
            </div>
            <el-button type="primary" class="forgetBtn">确认</el-button>
            <div class="rollBtns">
              <span class="toLogin" @click="len = '-500px'"
                ><i class="el-icon-back"></i>登录</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Input, Button, Icon } from "element-ui";
export default {
  name: "LoginPage",
  data() {
    return {
      account: "",
      password: "",
      len: "-500px",
      registerAccount:"",
      registerPassword:"",
      surePassword:"",
      registerCode:"",
      registerEmail:"",
      forgetPassword:"",
      forgetSurePassword:"",
      forgetCode:"",
      forgetEmail:""
      // scrollLength:{
      //   left:len
      // }
    };
  },
  components: {
    [Input.name]: Input,
    [Button.name]: Button,
    [Icon.name]: Icon,
  },
  methods: {
    toLogin() {},
  },
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
  height: 380px;
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
  height: 380px;
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
  .toLogin{
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

.registerBtn{
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
  .toLogin{
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

.forgetBtn{
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

</style>
