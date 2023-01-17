<template>
  <el-container class="content">
    <el-header class="header">
      <div class="logoPic">LOGO</div>
      <el-dropdown class="myBox" >
        <span class="el-dropdown-link">
          <div class="headPortrait"></div>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>首页</el-dropdown-item>
          <el-dropdown-item>我的</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container class="mainContent">
      <el-aside width="200px">
        <div class="classInfo">
          <div class="classPic"></div>
          <div class="className">高等数学</div>
        </div>
        <el-menu :default-active="pagePath" class="el-menu-vertical-demo">
          <router-link to="/student/classTask">
            <el-menu-item index="/student/classTask">
              <span slot="title"><i class="el-icon-s-claim"></i>课程任务</span>
            </el-menu-item>
          </router-link>
          <router-link to="/student/classWork">
            <el-menu-item index="/student/classWork">
              <span slot="title"><i class="el-icon-edit"></i>课程作业</span>
            </el-menu-item>
          </router-link>
          <router-link to="/student/classDiscussion">
            <el-menu-item index="/student/classDiscussion">
              <span slot="title"><i class="el-icon-chat-line-square"></i> 课程讨论</span>
            </el-menu-item>
          </router-link>
          <router-link to="/student/studyGroup">
            <el-menu-item index="/student/studyGroup">
              <span slot="title"><i class="el-icon-house"></i>我的小组</span>
            </el-menu-item>
          </router-link>
          <router-link to="/student/shareData">
            <el-menu-item index="/student/shareData">
              <span slot="title"><i class="el-icon-share"></i>共享资料</span>
            </el-menu-item>
          </router-link>
          <router-link to="/student/learnDaily">
            <el-menu-item index="/student/learnDaily">
              <span slot="title"><i class="el-icon-notebook-2"></i>学习情况</span>
            </el-menu-item>
          </router-link>
          <router-link to="/student/classStudents">
            <el-menu-item index="/student/classStudents">
              <span slot="title"><i class="el-icon-user"></i>课程成员</span>
            </el-menu-item>
          </router-link>
          <router-link to="/student/aboutClass">
            <el-menu-item index="/student/aboutClass">
              <span slot="title"><i class="el-icon-collection"></i>关于课程</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
import { Container, Header, Aside, Main, Menu, MenuItem,Dropdown,DropdownMenu,DropdownItem } from "element-ui";
export default {
  data() {
    return {
      pagePath: this.$route.path,
    };
  },
  components: {
    [Container.name]: Container,
    [Header.name]: Header,
    [Aside.name]: Aside,
    [Main.name]: Main,
    [Menu.name]: Menu,
    [MenuItem.name]: MenuItem,
    [Dropdown.name]:Dropdown,
    [DropdownMenu.name]:DropdownMenu,
    [DropdownItem.name]:DropdownItem
  },
};
</script>

<style lang="less" scoped>
body,html{
  height: 100vh;
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
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
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
    height: 60px;
    background-color: #fff;
    border-bottom: 2px solid cornflowerblue;
    // box-shadow:0px -10px red inset
  }
  .mainContent {
    flex: 1;
    .el-aside{
      display: flex;
      height: 100vh;
      flex-direction: column;
      .el-menu{
        overflow: auto;
      }
      .el-menu{
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

.myBox{
  float: right;
  margin-right: 50px;
}
.headPortrait{
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

.logoPic{
  display: inline-block;
  width: 50px;
  height: 50px;
  margin-top: 5px;
  float: left;
  margin-left: 60px;
}

</style>