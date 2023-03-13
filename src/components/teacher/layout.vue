<template>
  <div>
    <!-- 头像 -->
    <!-- 导航栏 -->
    <div class="nav">
      <el-menu
        router
        :default-active="this.$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="/teacher">
          <i class="el-icon-menu"></i>
          <span slot="title">教师端</span>
        </el-menu-item>
        <el-menu-item index="/teacher/myClassroom">
          <i class="el-icon-document"></i>
          <span slot="title">我的课程</span>
        </el-menu-item>
        <el-menu-item index="/teacher/classList">
          <i class="el-icon-s-grid"></i>
          <span slot="title">班级管理</span>
        </el-menu-item>
        <el-menu-item index="/teacher/studentList">
          <i class="el-icon-s-custom"></i>
          <span slot="title">学生管理</span>
        </el-menu-item>
        <el-menu-item index="/teacher/signList">
          <i class="el-icon-location"></i>
          <span slot="title">签到管理</span>
        </el-menu-item>
        <el-menu-item index="/teacher/operationList">
          <i class="el-icon-s-order"></i>
          <span slot="title">作业管理</span>
        </el-menu-item>
        <el-menu-item index="/teacher/taskManagement">
          <i class="el-icon-date"></i>
          <span slot="title">任务管理</span>
        </el-menu-item>
        <el-menu-item index="/teacher/performanceManagement">
          <i class="el-icon-s-marketing"></i>
          <span slot="title">成绩分析</span>
        </el-menu-item>
        <el-menu-item index="/teacher/attachmentList">
          <i class="el-icon-paperclip"></i>
          <span slot="title">附件管理</span>
        </el-menu-item>
        <el-menu-item index="/teacher/classroomDiscussion">
          <i class="el-icon-chat-dot-square"></i>
          <span slot="title">讨论管理</span>
        </el-menu-item>
        <el-menu-item index="/teacher/classroomGroup">
          <i class="el-icon-connection"></i>
          <span slot="title">分组管理</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="main">
      <div class="header">
        <div class="title">
          <span>易学堂</span>
        </div>
        <div class="userInfo">
          <el-dropdown>
            <span class="el-dropdown-link">
              <div class="dropDown">
                <div class="userImg">
                  <img :src="imgUrl" alt="" />
                </div>
                <div class="userName">
                  <span>{{ userName }}</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </div>
              </div>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="changeUser"
                >修改信息</el-dropdown-item
              >
              <el-dropdown-item @click.native="quitLogin"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div id="body">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { Dropdown, DropdownItem, DropdownMenu } from "element-ui";
import { getUserInfo } from "@/api/teacher";
export default {
  name: "myLayout",
  data() {
    return {
      isCollapse: false,
      userName: "",
      imgUrl: "",
    };
  },
  components: {
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    changeUser() {
      this.$router.push({
        path: "/teacher/UserInfo",
      });
    },
    getInfo() {
      getUserInfo().then((result) => {
        this.userName = result.data.user.userName;
        this.imgUrl = result.data.user.photo;
      });
    },
    quitLogin() {
      this.$confirm("确定要退出登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        window.localStorage.setItem("token", "");
        this.$store.commit("DELTOKEN", "");
        this.$router.push({
          path: "/login",
        });
      });
    },
  },
  mounted() {
    this.getInfo();
  },
};
</script>

<style scoped>
.nav {
  height: 100vh;
  width: 200px;
  position: fixed;
}

.main {
  min-height: 100vh;
  margin: 0px 0px 0px 200px;
}

.header {
  position: relative;
  height: 62px;
  border-bottom: 1px solid #dcdfe6;
}

.closeBtn {
  border: none;
  padding: 2px 30px 2px;
  height: 100%;
  font-size: 21px;
  background-color: #ff5722;
  cursor: pointer;
  float: left;
  color: white;
}

.title > span {
  padding: 10px 30px;
  line-height: 70px;
  font-size: 20px;
  font-weight: bold;
}

.dropDown {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.userInfo {
  position: absolute;
  text-align: center;
  justify-content: center;
  align-items: center;
  right: 30px;
  top: 10px;
}

.userImg > img {
  width: 45px;
  border-radius: 50%;
}

#body {
  padding: 25px;
}
</style>