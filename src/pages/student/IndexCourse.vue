<template>
  <div class="course">
    <div class="course_intro">
      <div class="intro">
        <div class="main">
          <div class="intro_img">
            <img :src="lesson.photo ? lesson.photo : require('@/assets/bac01.jpeg')" />
          </div>
          <div class="intro_text">
            <div class="teacher">
              <div class="course_name">{{lesson.name}}</div>
              <p style="text-align: left">
                主讲人:<span>叶子</span>教室团队：<span>一人</span>
              </p>
            </div>
            <div class="infor">
              <ul>
                <li>学校：河南科技学院</li>
                <li>学分：2分</li>
                <li>开课院系：文学学院</li>
                <li>课时：64个</li>
                <li>行政班级：计科213</li>
                <li>编号：1111</li>
              </ul>
              <el-button type="primary" round
                ><router-link to="/user/IndexBase"
                  >进入课程</router-link
                ></el-button
              >
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
             {{lesson.intro}}
            </div>
          </el-tab-pane>
          <el-tab-pane label="老师介绍" name="second">
            <div class="les">
              同学们好
              <p>
                金秋校园，书韵馨香！《论语》是儒家的一部核心经典，千百年来是莘莘学子必读之书目，世人修身之法则。宋代丞相赵普盛赞道：“半部《论语》治天下”。可见，《论语》是和谐人伦关系的金科玉律，是修齐治平，协和万邦的智慧宝典，让我们共读《论语》，传承圣贤文化，开启福慧人生！
              </p>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { ZgetOneCourse } from "@/api/user/index";
import { Tabs, TabPane } from "element-ui";
export default {
  name: "IndexCourse",
  data() {
    return {
      adatar: "",
      activeName: "first",
      leid:this.$route.query.id,
      lesson: {
        name: "",
        photo: "",
        intro: "",
        beginTime: "",
      },
      teacher: {
        sex: "",
        major: "",
      },
    };
  },
  mounted: function () {
    this.Getnews();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    Getnews() {
    console.log("id值："+this.leid);
      let data = {
        id: this.leid,
      };
      ZgetOneCourse(data).then((result) => {
        console.log("课程详情页取出课程信息", result);
        if (result.msg == "OK") {
          this.lesson.name=result.data.courseName
          this.lesson.photo=result.data.cover
          this.lesson.intro=result.data.details
          this.lesson.beginTime=result.data.createTime
        } else {
          this.$message.error("获取课程信息失败");
        }
      });
    },
  },
  components: {
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
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
      width: 180px;
      margin-right: 10px;
      margin-bottom: 15px;
      font-size: 14px;
      line-height: 20px;
      float: left;
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
</style>