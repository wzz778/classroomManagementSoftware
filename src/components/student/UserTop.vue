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
        <template slot="title">用户名</template>
        <el-menu-item index="2-1">账号管理</el-menu-item>
        <el-menu-item index="2-2">退出登录</el-menu-item>
      </el-submenu>
      <el-menu-item index="2">消息中心</el-menu-item>
      <el-menu-item index="3">
        <el-button type="text" @click="open"
          >输入邀请码</el-button
        ></el-menu-item
      >
    </el-menu>
    <router-view></router-view>
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
export default {
  name: "UserTop",
  data() {
    return {
      activeIndex: "1",
    };
  },
  methods: {
    open() {
      this.$prompt("请输入班级邀请码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[a-zA-Z\d]{4}$/,
        inputErrorMessage: "邀请码格式不正确",
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "成功加入" + value,
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
  },
};
</script>

<style lang="less" scoped>
.nav {
  ul {
    // position: fixed;
    // top: 0px;
    // z-index: 5;
    height: 60px;
    width: 100%;
    li {
      float: right;
    }
  }
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