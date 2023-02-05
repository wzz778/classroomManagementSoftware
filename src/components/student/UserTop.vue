<template>
  <div class="nav">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu index="1">
        <template slot="title">{{username}}</template>
        <router-link to="/user/UserInfo" style="color: white"
            >
        <el-menu-item index="2-1"
          >账号管理</el-menu-item
        ></router-link
          >
        <el-menu-item index="2-2" @click="logout">退出登录</el-menu-item>
      </el-submenu>
      <el-menu-item index="2"
        ><router-link to="/user/InboxPage">消息中心</router-link></el-menu-item
      >
      <el-menu-item index="3" @click="open"> 输入邀请码</el-menu-item>
      <el-menu-item index="5"
        ><router-link to="/user/IndexBase">课程空间</router-link></el-menu-item
      >
    </el-menu>
    <router-view :change="msg"></router-view>
    <div class="footer">
      <div class="footerMain">
        <div class="logo"></div>
        <div class="ourInfo">
          <p>
            <span class="el-icon-map-location"></span
            >地址：河南省新乡市华兰大道东段河南科技学院
          </p>
          <p>
            <span class="el-icon-message"></span>邮编：123456
            <span class="el-icon-mobile"></span>电话：13489562341
          </p>
          <p>
            <span class="el-icon-chat-line-square"></span>邮箱：23895650@qq.com
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ZaddGrade, ZlogOut, ZgetUserInfo } from "@/api/user/index";
export default {
  name: "UserTop",
  data() {
    return {
      activeIndex: "4",
      urlp: "/user/IndexBase",
      msg: 1,
      username:"",
    };
  },
  mounted: function () {
  this.getName()
  },
  methods: {
  getName(){
            ZgetUserInfo().then((result) => {
            console.log("用户信息", result);
            this.username=result.data.user.name
          });
  },
    open() {
      this.$prompt("请输入课程邀请码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        //4个字母:小写字母a到z 大写字母A到Z 数字 中的一个或多个 /^[a-zA-Z\d]{4}$/
        inputPattern: /^[a-zA-Z\d]{4,15}$/,
        inputErrorMessage: "邀请码格式不正确",
      })
        .then(({ value }) => {
          let data = {
            code: value,
          };
          ZgetUserInfo().then((result) => {
            console.log("用户信息", result);
            if (result.data.user.gradeId == "0") {
              this.$message({
                type: "success",
                message: "请先加入班级",
              });
            } else {
              ZaddGrade(data).then((result) => {
                console.log("加入课程", result);
                if (result.data == "已加入") {
                  this.$message({
                    type: "success",
                    message: "加入课程成功",
                  });
                  if (
                    this.$route.path == "/user/IndexBase" ||
                    this.$route.path == "/user/InboxPage"
                  ) {
                    this.msg++;
                  }
                } else {
                  this.$message.error("邀请码错误");
                }
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      ZlogOut().then((result) => {
        console.log("退出登录", result);
        if ((result.data = "已退出")) {
          this.$message({
            type: "success",
            message: "退出登录成功",
          });
          window.localStorage.setItem("token", "");
          this.$store.commit("DELTOKEN", "");
          this.$router.push({
            path: "/login",
          });
        }
      });
    },
    //弹框
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
  // 组件内路由进入组件时
  beforeCreate() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color: #f1f1f1;");
  },
  // 销毁前清除（非必须,不清除的话完全可以）
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  },
};
</script>

<style lang="less" scoped>
.nav {
  ul {
    height: 60px;
    width: 100%;
    li {
      float: right;
    }
    li:hover {
      cursor: default;
    }
  }
}
a:hover {
  cursor: pointer;
}

.footer {
  width: 100%;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: rgb(84, 92, 100);
  color: white;
  .footerMain {
    width: 600px;
    margin: 0 auto;
    display: flex;
    .logo {
      display: inline-block;
      width: 100px;
      height: 100px;
      margin-right: 20px;
      background-image: url("@/assets/bac01.jpeg");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100%;
    }
    .ourInfo {
      width: auto;
      p {
        line-height: 30px;
        font-size: 15px;
      }
    }
  }
}
</style>