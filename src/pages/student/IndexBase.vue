<template>
  <div class="base">
    <div class="lesson">
      <div class="lesson_title">我学的课程</div>
      <div class="lesson_con">
        <el-row :gutter="20">
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <div>
                <router-link to="/student/classTask">
                  <img
                    :src="adatar ? adatar : require('@/assets/bac01.jpeg')"
                  />
                </router-link>
                <h3>离散数学</h3>
                <p>叶子</p>
                <p>班级：1班</p>
              </div>
            </div></el-col
          >
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <div>
                <router-link to="/student/classTask">
                  <img
                    :src="adatar ? adatar : require('@/assets/bac01.jpeg')"
                  />
                </router-link>
                <h3>离散数学</h3>
                <p>叶子</p>
                <p>班级：1班</p>
              </div>
            </div></el-col
          >
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <div>
                <router-link to="/student/classTask">
                  <img
                    :src="adatar ? adatar : require('@/assets/bac01.jpeg')"
                  />
                </router-link>
                <h3>离散数学</h3>
                <p>叶子</p>
                <p>班级：1班</p>
              </div>
            </div></el-col
          >
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <div>
                <router-link to="/student/classTask">
                  <img
                    :src="adatar ? adatar : require('@/assets/bac01.jpeg')"
                  />
                </router-link>
                <h3>离散数学</h3>
                <p>叶子</p>
                <p>班级：1班</p>
              </div>
            </div></el-col
          >
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <div>
                <router-link to="/student/classTask">
                  <img
                    :src="adatar ? adatar : require('@/assets/bac01.jpeg')"
                  />
                </router-link>
                <h3>离散数学</h3>
                <p>叶子</p>
                <p>班级：1班</p>
              </div>
            </div></el-col
          >
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <div>
                <router-link to="/student/classTask">
                  <img
                    :src="adatar ? adatar : require('@/assets/bac01.jpeg')"
                  />
                </router-link>
                <h3>离散数学</h3>
                <p>叶子</p>
                <p>班级：1班</p>
              </div>
            </div></el-col
          >
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <div>
                <router-link to="/student/classTask">
                  <img
                    :src="adatar ? adatar : require('@/assets/bac01.jpeg')"
                  />
                </router-link>
                <h3>离散数学</h3>
                <p>叶子</p>
                <p>班级：1班</p>
              </div>
            </div></el-col
          >
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <div>
                <router-link to="/student/classTask">
                  <img
                    :src="adatar ? adatar : require('@/assets/bac01.jpeg')"
                  />
                </router-link>
                <h3>离散数学</h3>
                <p>叶子</p>
                <p>班级：1班</p>
              </div>
            </div></el-col
          >
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <div>
                <router-link to="/student/classTask">
                  <img
                    :src="adatar ? adatar : require('@/assets/bac01.jpeg')"
                  />
                </router-link>
                <h3>离散数学</h3>
                <p>叶子</p>
                <p>班级：1班</p>
              </div>
            </div></el-col
          >
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <div>
                <router-link to="/student/classTask">
                  <img
                    :src="adatar ? adatar : require('@/assets/bac01.jpeg')"
                  />
                </router-link>
                <h3>离散数学</h3>
                <p>叶子</p>
                <p>班级：1班</p>
              </div>
            </div></el-col
          >
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <div>
                <router-link to="/student/classTask">
                  <img
                    :src="adatar ? adatar : require('@/assets/bac01.jpeg')"
                  />
                </router-link>
                <h3>离散数学</h3>
                <p>叶子</p>
                <p>班级：1班</p>
              </div>
            </div></el-col
          >
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <div>
                <router-link to="/student/classTask">
                  <img
                    :src="adatar ? adatar : require('@/assets/bac01.jpeg')"
                  />
                </router-link>
                <h3>离散数学</h3>
                <p>叶子</p>
                <p>班级：1班</p>
              </div>
            </div></el-col
          >
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
    };
  },
  methods: {
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
    position: fixed;
    top: 0px;
    z-index: 5;
    height: 60px;
    width: 100%;
    li {
      float: right;
    }
  }
  padding-bottom: 20px;
  .lesson {
    width: 1160px;
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
img {
  width: 100%;
  max-height: 128px;
  border-radius: 6px;
}
p {
  color: #434446;
}
</style>