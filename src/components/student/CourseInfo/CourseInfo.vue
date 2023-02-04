<template>
  <el-container class="content">
    <el-header class="header">
      <router-link to="/user/IndexBase" class="logoPic"
        >课堂管理系统</router-link
      >
      <div class="myBox">
        <router-link to="/user/userInfo"
          ><div class="headPortrait" :style="{backgroundImage:`url(${userInfo.photo})`}"></div
        ></router-link>
      </div>
    </el-header>
    <el-container class="mainContent">
      <el-aside width="200px">
        <div class="classInfo">
          <div class="classPic" :style="{backgroundImage:`url(${courseInfo.cover})`}"></div>
          <div class="className">{{ courseInfo.courseName }}</div>
        </div>
        <el-menu :default-active="pagePath" class="el-menu-vertical-demo">
          <router-link
            :to="{
              path: '/student/classTask',
              query: {
                id: this.courid,
              },
            }"
          >
            <el-menu-item index="/student/classTask">
              <span slot="title"><i class="el-icon-s-claim"></i>课程任务</span>
            </el-menu-item>
          </router-link>
          <router-link
            :to="{
              path: '/student/classWork',
              query: {
                id: this.courid,
              },
            }"
          >
            <el-menu-item index="/student/classWork">
              <span slot="title"><i class="el-icon-edit"></i>课程作业</span>
            </el-menu-item>
          </router-link>
          <router-link
            :to="{
              path: '/student/classDiscussion',
              query: {
                id: this.courid,
              },
            }"
          >
            <el-menu-item index="/student/classDiscussion">
              <span slot="title"
                ><i class="el-icon-chat-line-square"></i> 课程讨论</span
              >
            </el-menu-item>
          </router-link>
          <router-link
            :to="{
              path: '/student/groupChat',
              query: {
                id: this.courid,
              },
            }"
          >
            <el-menu-item index="/student/studyGroup">
              <span slot="title"><i class="el-icon-house"></i>我的小组</span>
            </el-menu-item>
          </router-link>
          <router-link
            :to="{
              path: '/student/shareData',
              query: {
                id: this.courid,
              },
            }"
          >
            <el-menu-item index="/student/shareData">
              <span slot="title"><i class="el-icon-share"></i>共享资料</span>
            </el-menu-item>
          </router-link>
          <!-- <router-link
            :to="{
              path: '/student/learnDaily',
              query: {
                id: this.courid,
              },
            }"
          >
            <el-menu-item index="/student/learnDaily">
              <span slot="title"
                ><i class="el-icon-notebook-2"></i>学习情况</span
              >
            </el-menu-item>
          </router-link> -->
          <router-link
            :to="{
              path: '/student/ClassMembers',
              query: {
                id: this.courid,
              },
            }"
          >
            <el-menu-item index="/student/ClassMembers">
              <span slot="title"><i class="el-icon-user"></i>课程成员</span>
            </el-menu-item>
          </router-link>
          <router-link
            :to="{
              path: '/student/IndexCourse',
              query: {
                id: this.courid,
              },
            }"
          >
            <el-menu-item index="/student/IndexCourse">
              <span slot="title"
                ><i class="el-icon-collection"></i>关于课程</span
              >
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-aside>
      <el-main class="mainContent"><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getCourseInfo,getUserInfo } from "@/api/student/yxyAxios";
import {
  Container,
  Header,
  Aside,
  Main,
  Menu,
  MenuItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "element-ui";
export default {
  data() {
    return {
      pagePath: this.$route.path,
      courid: this.$route.query.id,
      courseInfo: "",
      userInfo:"",
    };
  },
  components: {
    [Container.name]: Container,
    [Header.name]: Header,
    [Aside.name]: Aside,
    [Main.name]: Main,
    [Menu.name]: Menu,
    [MenuItem.name]: MenuItem,
    [Dropdown.name]: Dropdown,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
  },
  methods: {
    getUserInfoFun() {
      getUserInfo().then((res) => {
        if (res.status == 200) {
          console.log(res.data);
          this.userInfo = res.data;
        } else {
          console.log("error");
        }
      });
    },
  },
  mounted() {
    console.log(this.$route.query.id);
    let data = {
      id: this.$route.query.id,
    };
    console.log(data);
    getCourseInfo(data).then((res) => {
      console.log("获取课程信息", res);
      this.courseInfo = res.data;
    });
    this.getUserInfoFun();
    
  },
};
</script>

<style lang="less" scoped>
body,
html {
  height: 100vh;
  overflow: hidden;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
  background-color: #fff;
  overflow-y: hidden;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  // text-align: center;
  // line-height: 160px;
  padding-bottom: 0;
}

body > .el-container {
  margin-bottom: 40px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.content {
  display: flex;
  height: 100vh;
  flex-direction: column;
  .header {
    // height: 60px;
    background-color: #fff;
    border-bottom: 2px solid cornflowerblue;
    // box-shadow:0px -10px red inset
  }
  .mainContent {
    flex: 1;
    .el-aside {
      display: flex;
      flex-direction: column;
      .el-menu {
        overflow: auto;
      }
      .el-menu {
        flex: 1;
      }
    }
  }
}

/* 整个滚动条 */
::-webkit-scrollbar {
  /* 对应纵向滚动条的宽度 */
  width: 4px;
  /* 对应横向滚动条的宽度 */
  height: 4px;
}

/* 滚动条上的滚动滑块 */
::-webkit-scrollbar-thumb {
  background-color: #49b1f5;
  border-radius: 10px;
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
  background-color: #dbeffd;
  border-radius: 32px;
}

.classInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 200px;
  border-bottom: 1px solid #ccc;
  .classPic {
    display: inline-block;
    width: 180px;
    height: 120px;
    background-image: url(@/assets/yxy/classPic.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    margin-top: 20px;
    border-radius: 5px;
  }
}
.className {
  display: inline-block;
  width: 90%;
  margin-left: 5%;
  height: 30px;
  line-height: 30px;
  color: cornflowerblue;
}

.myBox {
  float: right;
  margin-right: 50px;
}
.headPortrait {
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  margin-top: 5px;
  background-image: url(@/assets/yxy/userProfile.jpg);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

.logoPic {
  display: inline-block;
  width: auto;
  height: 50px;
  margin-top: 5px;
  float: left;
  margin-left: 20px;
  font-size: 22px;
  font-weight: 700;
  cursor: pointer;
}
.mainContent {
  overflow: auto;
}
</style>