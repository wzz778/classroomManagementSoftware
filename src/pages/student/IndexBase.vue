<template>
  <div class="base">
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
      <el-menu-item index="3"> <el-button type="text" @click="open">输入邀请码</el-button></el-menu-item>
    </el-menu>
    <div class="lesson">
      <div class="lesson_title">我学的课程</div>
      <div class="lesson_con">
        <el-row :gutter="20">
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <div>
                <img
                  :src="adatar ? adatar : require('@/assets/bac01.jpeg')"
                />
                <h3>离散数学</h3>
                <p>叶子</p>
                <p>班级：1班</p>
              </div></div
          ></el-col>
                    <el-col :span="6"
            ><div class="grid-content bg-purple">
              <div>
                <img
                  :src="adatar ? adatar : require('@/assets/bac01.jpeg')"
                />
                <h3>离散数学</h3>
                <p>叶子</p>
                <p>班级：1班</p>
              </div></div
          ></el-col>
                    <el-col :span="6"
            ><div class="grid-content bg-purple">
              <div>
                <img
                  :src="adatar ? adatar : require('@/assets/bac01.jpeg')"
                />
                <h3>离散数学</h3>
                <p>叶子</p>
                <p>班级：1班</p>
              </div></div
          ></el-col>
                    <el-col :span="6"
            ><div class="grid-content bg-purple">
              <div>
                <img
                  :src="adatar ? adatar : require('@/assets/bac01.jpeg')"
                />
                <h3>离散数学</h3>
                <p>叶子</p>
                <p>班级：1班</p>
              </div></div
          ></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <div>
                <img
                  :src="adatar ? adatar : require('@/assets/bac01.jpeg')"
                />
                <h3>离散数学</h3>
                <p>叶子</p>
                <p>班级：1班</p>
              </div></div
          ></el-col>
                    <el-col :span="6"
            ><div class="grid-content bg-purple">
              <div>
                <img
                  :src="adatar ? adatar : require('@/assets/bac01.jpeg')"
                />
                <h3>离散数学</h3>
                <p>叶子</p>
                <p>班级：1班</p>
              </div></div
          ></el-col>
                    <el-col :span="6"
            ><div class="grid-content bg-purple">
              <div>
                <img
                  :src="adatar ? adatar : require('@/assets/bac01.jpeg')"
                />
                <h3>离散数学</h3>
                <p>叶子</p>
                <p>班级：1班</p>
              </div></div
          ></el-col>
                    <el-col :span="6"
            ><div class="grid-content bg-purple">
              <div>
                <img
                  :src="adatar ? adatar : require('@/assets/bac01.jpeg')"
                />
                <h3>离散数学</h3>
                <p>叶子</p>
                <p>班级：1班</p>
              </div></div
          ></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <div>
                <img
                  :src="adatar ? adatar : require('@/assets/bac01.jpeg')"
                />
                <h3>离散数学</h3>
                <p>叶子</p>
                <p>班级：1班</p>
              </div></div
          ></el-col>
                    <el-col :span="6"
            ><div class="grid-content bg-purple">
              <div>
                <img
                  :src="adatar ? adatar : require('@/assets/bac01.jpeg')"
                />
                <h3>离散数学</h3>
                <p>叶子</p>
                <p>班级：1班</p>
              </div></div
          ></el-col>
                    <el-col :span="6"
            ><div class="grid-content bg-purple">
              <div>
                <img
                  :src="adatar ? adatar : require('@/assets/bac01.jpeg')"
                />
                <h3>离散数学</h3>
                <p>叶子</p>
                <p>班级：1班</p>
              </div></div
          ></el-col>
                    <el-col :span="6"
            ><div class="grid-content bg-purple">
              <div>
                <img
                  :src="adatar ? adatar : require('@/assets/bac01.jpeg')"
                />
                <h3>离散数学</h3>
                <p>叶子</p>
                <p>班级：1班</p>
              </div></div
          ></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexBase",
  data() {
    return {
      adatar: "",
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
            type: 'success',
            message: '成功加入' + value
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    },
  // 组件内路由进入组件时
  beforeCreate() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color: #f1f1f1;;");
  },
  // 销毁前清除（非必须,不清除的话完全可以,这块只不过告诉您可以这么玩）
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  },
};
</script>

<style lang="less" scoped>
.base {
  ul {
    li {
      float: right;
    }
  }
  padding-bottom: 20px;
  .lesson {
    width: 1140px;
    min-height: 400px;
    margin: 30px auto 0px;
    background-color: white;
    border-radius: 5px;
  }
}
.lesson_title {
  line-height: 60px;
  padding-left: 40px;
  border-bottom: 1px solid #00000057;
}
.lesson_con {
  padding: 20px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  // background: #99a9bf;
}
.bg-purple {
  // background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 180px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
img{
width: 100%;
max-height: 100px;
border-radius: 6px;
}
p{
color: #434446;
}
</style>