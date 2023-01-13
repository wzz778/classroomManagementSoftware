<template>
  <div class="course">
    <div class="course_intro">
      <div class="intro">
        <div class="main">
          <div class="intro_img">
            <img :src="adatar ? adatar : require('@/assets/bac01.jpeg')" />
          </div>
          <div class="intro_text">
            <div class="teacher">
              <div class="course_name">论语</div>
              <p><span>主讲人:叶子</span><span>教室团队：一人</span></p>
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
              <el-button type="primary" round><router-link  to="/IndexBase">进入课程</router-link></el-button>
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
              儒家文化是我们整个中华民族思想文化的基础，而《论语》正是对于我们当代人最有用，最能集中体现儒家思想的一部重要的经典。半部《论语》治天下，可见其中的哲理既大道至简，
              又贴近生活。两千年多来，上至帝王将相，下至黎庶百姓必读的修身宝典。
              本课程通过指导大学生研读《论语》，本着以经解经的方式，深入学习儒家的圣贤文化。使大学生不仅了解孔子作为大成至圣先师的人格魅力，感悟儒家的以人为本的仁爱思想。二千多年以后的今天，我们着重学习儒家思想的智慧和精神实质，学习儒家的思维模式、待人的态度和处事的方法，学习儒家的内圣外王的修身之道和价值追求，建构正确的人生观、价值观。并以此引领新时代大学生学习国学，热爱国学的意识，培养莘莘学子以天下为己任的家国情怀，潜修修齐治平之道，开启福慧双增人生。
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
import { Tabs, TabPane } from "element-ui";
export default {
  name: "IndexCourse",
  data() {
    return {
      adatar: "",
      activeName: "first",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
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
  padding: 40px 0 30px;
  overflow: hidden;
  margin-bottom: 10px;
}
.text_course {
  box-shadow: 0px 1px 12px 0px #edeef0;
  padding: 20px 40px 30px;
  overflow: hidden;
  margin: 50px 40px;
  border-radius: 6px;
  .te {
    width: 1100px;
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
  width: 1200px;
  margin: 0 auto;
}
.main,
.intro_img {
  position: relative;
  width: 544px;
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
  width: 640px;
  margin-left: 564px;
}
.teacher {
  min-height: 100px;
  padding-bottom: 46px;
  margin-right: 32px;
  font-size: 14px;
  line-height: 20px;
}
.course_name {
  font-size: 20px;
  color: #181e33;
  min-height: 60px;
  overflow: hidden;
}
span {
  margin-right: 32px;
  font-size: 14px;
  line-height: 20px;
  margin: 8px 50px 0px 0px;
}
.infor {
  position: relative;
  width: 640px;
  height: 166px;
  background: #f5f7fa;
  border-radius: 6px;
  margin-top: 8px;
  ul {
    padding: 20px 25px 5px;
    overflow: hidden;
    li {
      width: 267px;
      margin-right: 10px;
      margin-bottom: 15px;
      font-size: 14px;
      line-height: 20px;
      float: left;
    }
  }
  button {
    float: right;
    margin: -10px 20px;
    a{
    color: white;
    }
  }
}
</style>