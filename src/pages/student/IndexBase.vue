<template>
  <div class="base">
    <div class="lesson">
      <div class="lesson_title">我学的课程</div>
      <div class="lesson_con">
        <el-row :gutter="20">
          <el-col :span="6" v-for="o in carr" :key="o.id"
            ><div class="grid-content bg-purple">
              <div>
                <router-link
                  :to="{
                    path: '/student/ClassTask',
                    query: {
                      id: o.id,
                    },
                  }"
                >
                  <img
                    :src="o.cover ? o.cover : require('@/assets/bac01.jpeg')"
                  />
                </router-link>
                <h3>{{ o.courseName }}</h3>
                <p>叶子</p>
                <p>创建时间：{{ o.createTime }}</p>
              </div>
            </div></el-col
          >
          <!-- <el-col :span="6"
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
              <div class="coursein">
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
          > -->
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { ZgetEntered, ZgetOneCourse } from "@/api/user/index";
export default {
  name: "IndexBase",
  data() {
    return {
      adatar: "",
      sarr: [],
      carr: [],
    };
  },
  props: ["change"],
  mounted: function () {
    this.Getclass();
  },
  watch: {
    change: {
      handler(newVal, oldVal) {
        console.info("value changed 1", newVal, oldVal);
        this.sarr = [];
        this.carr = [];
        this.Getclass();
      },
      deep: true,
    },
  },
  methods: {
    Getclass() {
      return new Promise((resolve, reject) => {
        let data = {
          nodePage: "",
          pageSize: "",
        };
        ZgetEntered(data).then((response) => {
          console.log("取出学生的课程", response);
          if (response.msg == "OK") {
            this.adatar = response.data.total;
            this.sarr = response.data.records;
            for (let q = 0; q < response.data.records.length; q++) {
              console.log("猜想：" + response.data.records[q] + this.sarr[q]);
              this.getAllclass(this.sarr[q]);
            }
          } else {
            this.$message.error("获取课程失败");
          }
        });
      });
    },
    getAllclass(se) {
      let cid = {
        id: se.courseId,
      };
      ZgetOneCourse(cid).then((result) => {
        console.log("取出课程信息", result);
        if (result.msg == "OK") {
          this.carr.push(result.data);
        } else {
          this.$message.error("获取课程信息失败");
        }
      });
    },
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
.coursein {
  p {
    font-size: 14px;
  }
}
</style>