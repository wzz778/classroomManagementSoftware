<template>
  <div id="layout">
    <div id="nav" class="nav1">
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        :router="true"
        :style="cstyle"
         background-color="#15273B"
         text-color="rgba(255, 255, 255, 0.9)"
         active-text-color="#FF9800"
      >
        <el-menu-item index="/admin/index">
          <i class="el-icon-menu"></i>
          <span slot="title">管理端</span>
        </el-menu-item>
        <!-- <el-menu-item index="/admin/index">
          <i class="el-icon-s-home"></i>
          <span slot="title">主页</span>
        </el-menu-item> -->
        <el-submenu index="/admin/users">
          <template slot="title">
            <i class="el-icon-s-custom"></i>
            <span slot="title">用户管理</span>
          </template>
          <el-menu-item index="/admin/users/list">用户列表</el-menu-item>
        </el-submenu>
        <el-submenu index="/admin/class">
          <template slot="title">
            <i class="el-icon-star-off"></i>
            <span slot="title">班级管理</span>
          </template>
          <el-menu-item index="/admin/class/list">班级列表</el-menu-item>
          <el-menu-item index="/admin/class/edit">班级创编</el-menu-item>
        </el-submenu>
        <el-submenu index="/admin/subject">
          <template slot="title">
            <i class="el-icon-star-on"></i>
            <span slot="title">课堂管理</span>
          </template>
          <el-menu-item index="/admin/subject/list">课堂列表</el-menu-item>
          <el-menu-item index="/admin/subject/edit">课堂创编</el-menu-item>
        </el-submenu>

        <el-menu-item index="/admin/journal/list">
          <i class="el-icon-date"></i>
          <span slot="title">日志中心</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div id="head" :class="rehead">
      <div class="headtop">
        <button
          type="button"
          id="sidebarCollapse"
          class="sidebar_toggle"
          @click="isCollapse = !isCollapse"
        >
          <i :class="refold"></i>
        </button>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="animate__animated">
          <el-breadcrumb-item v-for="p of alltitle" class="animate__animated animate__fadeInRight" :key="p.index">
            {{p}}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          router
        >
          <el-submenu index="1">
            <template slot="title">admin</template>
            <!-- <el-menu-item index="2-1">个人信息</el-menu-item> -->
            <!-- <el-menu-item index="2-2">主页</el-menu-item> -->
            <el-menu-item @click="quitLogin" index="2-3">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div class="headbottom">
        <el-tabs
          v-model="editableTabsValue"
          type="card"
          @tab-remove="removeTab"
          @tab-click="tabClick"
        >
          <el-tab-pane
            v-for="item in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
            closable
          >
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div id="body" 
      :class="rebody"
    >
      <router-view 
        class="animate__animated animate__fadeInLeft"         
      ></router-view>
    </div>  
  </div>
</template>

<script>
// import 'animate.css'
import {
  Submenu,
  Menu,
  RadioGroup,
  RadioButton,
  MenuItem,
  MenuItemGroup,
  Breadcrumb,
  BreadcrumbItem,
  Tabs,
  TabPane,
} from "element-ui";
export default {
  name: "AdminLayout",
  components: {
    [Submenu.name]: Submenu,
    [Menu.name]: Menu,
    [MenuItem.name]: MenuItem,
    [MenuItemGroup.name]: MenuItemGroup,
    [RadioGroup.name]: RadioGroup,
    [RadioButton.name]: RadioButton,
    [Breadcrumb.name]: Breadcrumb,
    [BreadcrumbItem.name]: BreadcrumbItem,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
  },
  data() {
    return {
      isCollapse: false,
      activeIndex: "1",
      rebody: "body1",
      rehead: "head1",
      refold: "el-icon-s-fold",
      alltitle: ["首页"],
      tabIndex: 2,
      cstyle:{
        width:"200px"
      }
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
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
    tabClick(tab){
      // console.log(tab.name);
      let path = tab.name;
      this.$store.commit('admin/setTabName', path);
      this.$router.push({path: path});
    },
    removeTab(targetName) {
      if(targetName === "/admin/index"){
        return;
      }
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      let tab1;
      tab1 = tabs.filter(tab => tab.name !== targetName);
      this.$store.commit('admin/addTab', tab1);
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
        this.$store.commit('admin/setTabName', activeName);
        this.$router.push({path: activeName});
      }
    },
  },
  watch: {
    isCollapse(newValue) {
      if (newValue) {
        this.rebody = "body2";
        (this.rehead = "head2"), (this.refold = "el-icon-s-unfold");
        this.cstyle.width="70px"
      } else {
        this.rebody = "body1";
        this.rehead = "head1";
        this.refold = "el-icon-s-fold";
        this.cstyle.width="200px"
      }
    },
    $route(to) {
      let arr = new Array();
      for (let i of to.matched) {
        if (i.meta.title != undefined) {
          arr.push(i.meta.title);
        }
      }
      this.alltitle = arr;
      let flag = false;
      let tabs = this.editableTabs;
      let route = this.editableTabsValue;
      for (let i of tabs) {
        if (i.name === to.path) {
          flag = true;
          //设置当前tab为当前路由
          this.$store.commit('admin/setTabName', to.path);
          break;
        }
      }
      if (!flag) {
        let data = {
          title: to.meta.title,
          name: to.path,
        };
        tabs.push(data);
        route = to.path;
        //设置tab数组
        this.$store.commit('admin/addTab', tabs);
        this.$store.commit('admin/setTabName', route);
      }
    },
  },

  computed: {
    //存放所有tab的数组 
      editableTabs() {
        let tabs;
        let data = this.$store.state.admin.editableTabs;
        tabs = typeof data === 'string'? JSON.parse(data):data;
        return tabs;
      },
      //当前tab 初始默认为首页(/home)
      editableTabsValue:{
        get(){
          return this.$store.state.admin.editableTabsValue;
        },
        set(){}
      }
  },
  mounted(){
    // console.log(this.$store.state.admin.editableTabs);
  }
};
</script>
<style  lang="less" scoped>
  #nav {
    height: 100vh;
    background-color: white;
    color: #fff;
    transition: all 0.3s;
    position: fixed;
    z-index: 101;
    // overflow:scroll;
    overflow: hidden;
    .el-menu-vertical-demo{
      height: 100vh;
      overflow-y: scroll; 
      overflow-x: none;
      // width: 200px;
      transform: all .3s;
        &::-webkit-scrollbar {
            width: 4px;    
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            box-shadow: inset 0 0 5px rgba(0,0,0,0.1);
            background: rgba(0,0,0,0.01);
        }
        &::-webkit-scrollbar-track {
            box-shadow: inset 0 0 5px rgba(0,0,0,0.1);
            border-radius: 0;
            background: rgba(0,0,0,0.01);
        }
    }
  }
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
#head {
  height: 88px;
  background-color: white;
    // border-bottom: solid 1px #e6e6e6;
  position: fixed;
  top: 0;
  width: 100%;
  color: white;
  z-index: 100;
  transition: all 0.3s;
  .headtop {
    width: 100%;
    height: 45px;
    border-bottom: solid 1px #e6e6e6;
    z-index: 2;
    overflow: hidden;

    .el-menu-demo {
      position: absolute;
      right: 0;
      top: 0;
      cursor: pointer;
      float: right;
      color: white;
      height: 40px;
      overflow: hidden;
      width: 100px;
      border: none;
    }
    #sidebarCollapse {
      border: none;
      padding: 2px 30px 2px;
      height: 100%;
      font-size: 21px;
      background-color: #ff5722;
      cursor: pointer;
      float: left;
      color: white;
    }
    .el-breadcrumb {
      float: left;
      margin: 15px 0 0 20px;
      font-size: 16px;
      width: 300px;
    }
  }
  .headbottom {
    width: 100%;
    height: 60px;
    overflow: hidden;
    
    .el-tabs__nav{
      float: left;
      .el-tabs__item{
        height: 30px;
      }
    }
    .el-button {
      float: left;
    }
  }
}
.head1 {
  width: 100%;
  padding-left: 200px;
}
.head2 {
  width: 100%;
  padding-left: 60px;
}
#body {
  width: 100%;
  min-height: 100vh;
  transition: all 0.3s;
  position: relative;
  z-index: 1;
  background-color: #f8f8f8;
  #begin-main {
    width: 100%;
    height: 600px;
    background-color: wheat;
  }
}
.body1 {
  padding: 100px 10px 10px 210px;
}
.body2 {
  padding: 100px 10px 10px 70px;
}
</style>