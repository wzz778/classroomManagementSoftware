<template>
  <div class="course">
    <div class="course_intro">
      <div class="intro">
        <div class="main">
          <div class="intro_img">
            <img
              :src="
                lesson.photo ? lesson.photo : require('@/assets/bac01.jpeg')
              "
            />
          </div>
          <div class="intro_text">
            <div class="teacher">
              <div class="course_name">{{ lesson.name }}</div>
              <p style="text-align: left">
                主讲人:<span>{{ teacher.tname }}</span
                >教室团队：<span>1人</span>
              </p>
            </div>
            <div class="infor">
              <ul>
                <li>课程码：{{ lesson.cord }}</li>
                <li>创建时间：{{ lesson.beginTime }}</li>
              </ul>
              <myLive v-show="user.identity=='1'" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text_course">
      <div class="te">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="课程概述" name="first">
            <div class="les">
              {{ lesson.intro }}
            </div>
          </el-tab-pane>
          <el-tab-pane label="老师介绍" name="second">
            <div class="tes">
              <div class="tesmain">
                <div>
                  <img
                    :src="
                      teacher.cover ? teacher.cover : require('@/assets/01.jpg')
                    "
                  />
                </div>
                <div>编号：{{ teacher.tcode }}</div>
                <div>姓名：{{ teacher.tname }}</div>
                <div>邮箱：{{ teacher.email }}</div>
              </div>
              <div class="tesmain">
                <div>
                  性别：
                  <el-radio disabled v-model="teacher.sex" label="男"
                    >男</el-radio
                  >
                  <el-radio
                    disabled
                    v-model="teacher.sex"
                    label="女"
                    style="margin-left: 20px"
                    >女</el-radio
                  >
                </div>
                <div>地址：{{ teacher.place }}</div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import myLive from "@/components/teacher/utilComponents/myLive.vue";
import { ZgetOneCourse, ZgetTeacherInfo, ZgetUserInfo } from "@/api/user/index";
import {
  Tabs,
  TabPane,
  Descriptions,
  DescriptionsItem,
  Radio,
} from "element-ui";
export default {
  name: "IndexCourse",
  data() {
    return {
      adatar: "",
      activeName: "first",
      leid: this.$route.query.id,
      lesson: {
        name: "",
        photo: "",
        intro: "",
        beginTime: "",
        cord: "",
      },
      teacher: {
        tname: "",
        sex: "男",
        cover: "",
        place: "",
        email: "",
        tcode: "",
      },
      user: {
        identity: "",
      },
    };
  },
  mounted: function () {
    this.Getnews();
    this.Getuser();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    Getnews() {
      console.log("id值：" + this.leid);
      let data = {
        id: this.leid,
      };
      ZgetOneCourse(data).then((result) => {
        console.log("课程详情页取出课程信息", result);
        if (result.msg == "OK") {
          this.lesson.name = result.data.courseName;
          this.lesson.photo = result.data.cover;
          this.lesson.intro = result.data.details;
          this.lesson.beginTime = result.data.createTime;
          this.lesson.cord = result.data.courseCode;
          let tid = {
            id: result.data.creatorId,
          };
          ZgetTeacherInfo(tid).then((response) => {
            if (response.msg == "OK") {
              this.teacher.tname = response.data.name;
              this.teacher.sex = response.data.sex;
              this.teacher.cover = response.data.photo;
              this.teacher.place = response.data.nativePlace;
              this.teacher.email = response.data.email;
              this.teacher.tcode = response.data.userName;
            } else {
              this.$message.error("获取教师信息失败");
            }
          });
        } else {
          this.$message.error("获取课程信息失败");
        }
      });
    },
    Getuser() {
      ZgetUserInfo().then((result) => {
        console.log("用户信息", result);
        this.user.identity = result.data.identity;
      });
    },
  },
  components: {
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [Descriptions.name]: Descriptions,
    [DescriptionsItem.name]: DescriptionsItem,
    [Radio.name]: Radio,
    myLive,
  },
};
</script>

<style lang="less" scoped>
.course_intro {
  box-shadow: 0px 1px 12px 0px #edeef0;
  background: white;
  padding: 40px 0 30px;
  overflow: hidden;
  margin-bottom: 10px;
}
.text_course {
  box-shadow: 0px 1px 12px 0px #edeef0;
  background: white;
  padding: 20px 0px 30px;
  overflow: hidden;
  margin: 50px 0px;
  border-radius: 6px;
  .te {
    width: 945px;
    min-height: 200px;
    margin: 0 auto;
  }
  .les {
    font-size: 14px;
    text-indent: 2em;
    color: rgb(51, 51, 51);
  }
}
.intro {
  position: relative;
  width: 1000px;
  margin: 0 auto;
}
.main,
.intro_img {
  position: relative;
  width: 524px;
  height: 322px;
  border-radius: 6px;
}
.intro_img {
  float: left;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
}
.intro_text {
  width: 450px;
  margin-left: 544px;
}
.teacher {
  min-height: 100px;
  padding-bottom: 46px;
  margin-right: 32px;
  font-size: 14px;
  line-height: 20px;
}
.course_name {
  text-align: left;
  font-size: 20px;
  color: #181e33;
  min-height: 60px;
  overflow: hidden;
}
span {
  font-size: 14px;
  line-height: 20px;
  margin: 8px 50px 0px 0px;
}
.infor {
  position: relative;
  width: 450px;
  height: 187px;
  background: #f5f7fa;
  border-radius: 6px;
  margin-top: 8px;
  ul {
    padding: 20px 25px 5px;
    overflow: hidden;
    li {
      // width: 180px;
      margin-right: 10px;
      margin-bottom: 15px;
      font-size: 14px;
      line-height: 20px;
      // float: left;
    }
  }
  button {
    float: right;
    margin: 7px 20px;
    a {
      color: white;
    }
  }
}
.tes {
  width: 700px;
  min-height: 200px;
  margin: 0 auto;
  display: flex;
  .tesmain {
    width: 50%;
    div {
      color: #666;
      margin-bottom: 20px;
    }
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }
}
</style>