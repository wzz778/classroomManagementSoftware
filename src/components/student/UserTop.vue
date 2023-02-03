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
        <el-menu-item index="2-1"
          ><router-link to="/user/UserInfo" style="color: white"
            >账号管理</router-link
          ></el-menu-item
        >
        <el-menu-item index="2-2">退出登录</el-menu-item>
      </el-submenu>
      <el-menu-item index="2"
        ><router-link to="/user/InboxPage">消息中心</router-link></el-menu-item
      >
      <el-menu-item index="3">
        <el-button type="text" @click="dialogVisible = true"
          >进入直播</el-button
        ></el-menu-item
      >
      <el-menu-item index="4">
        <el-button type="text" @click="open"
          >输入邀请码</el-button
        ></el-menu-item
      >
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
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <div class="dialogSty">
        <el-form label-width="80px">
          <el-form-item label="选取课程" v-if="!isChange">
            <el-select
              v-model="value"
              placeholder="请选择"
              style="margin-right: 20px"
            >
              <el-option
                v-for="item in clas"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="房间号">
            <el-input v-model="name" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialogOperator">
        <el-button @click="dialogVisible = false" type="">取消</el-button>
        <el-button @click="dialogVisible = false" type="">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ZaddGrade, ZgetEntered, ZgetOneCourse } from "@/api/user/index";
export default {
  name: "UserTop",
  data() {
    return {
      activeIndex: "5",
      urlp: "/user/IndexBase",
      msg: 1,
      //弹框
      dialogVisible: false,
      srr: [],
      clas: [],
      value:''
    };
  },
  mounted: function () {
    this.Getclass();
  },
  methods: {
    open() {
      console.log("页面链接：" + this.$route.path);
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
    Getclass() {
      let data = {
        nodePage: "",
        pageSize: "",
      };
      ZgetEntered(data).then((response) => {
        if (response.msg == "OK") {
          this.srr = response.data.records;
          for (let q = 0; q < response.data.records.length; q++) {
            this.getAllclass(this.srr[q]);
          }
          this.value = this.srr[0].courseId;
        } else {
          this.$message.error("暂无数据");
        }
      });
    },
    getAllclass(se) {
      let cid = {
        id: se.courseId,
      };
      ZgetOneCourse(cid).then((result) => {
        if (result.msg == "OK") {
          let obj = {};
          obj["value"] = result.data.id;
          obj["label"] = result.data.courseName;
          this.clas.push(obj);
        } else {
          this.$message.error("暂无数据");
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