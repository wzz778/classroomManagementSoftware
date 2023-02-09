<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <div class="doResult">
        <h3 class="paperName">{{ homeworkInfo.homeworkName }}</h3>
      </div>
      <div class="topicTab">
        <h4 style="text-align: center">题号</h4>
        <a
          v-for="(topic, index) in homeworkInfo.questionCount"
          :key="index"
          @click="toTopic('#t' + index)"
        >
          <el-tag
            :type="
              userAnswer[index].answer == '' || userAnswer[index].answer == []
                ? 'info'
                : 'success'
            "
            class="tagItem"
            >{{ index + 1 }}</el-tag
          >
        </a>
      </div>
      <div class="remarkArea">备注：{{ homeworkInfo.remark }}</div>
      <div class="btn">
        <el-button type="primary" @click.native="submitCorrect"
          >提交批改</el-button
        >
      </div>
    </el-aside>

    <el-container class="content">
      <el-header style="text-align: right; font-size: 12px" class="title">
        <i class="el-icon-back" @click="goBack" id="goBack">返回</i>
        <span>总分：{{ allScore }}</span>
      </el-header>
      <el-main>
        <div v-for="(topic, index) in topics" :key="index">
          <div class="topicItem" :id="'t' + index">
            <div
              class="topicTitle"
              v-html="
                index +
                1 +
                '、' +
                topic.questionContent.topicInfo 
              "
            ></div>
            <!-- 单选 、判断-->
            <template
              v-if="
                topic.questionContent.type == 1 ||
                topic.questionContent.type == 3
              "
            >
              <div class="choiceItem">
                <el-radio-group v-model="userAnswer[index].answer">
                  <div
                    v-for="(op, index) in topic.questionContent.optionsInfo"
                    :key="index"
                    class="chooseItem"
                  >
                    <el-radio :label="op.options" disabled></el-radio>
                    <span
                      style="height: 30px; font-size: 15px"
                      v-html="op.value"
                    ></span>
                  </div>
                </el-radio-group>
              </div>
            </template>
            <!-- 多选 -->
            <template v-if="topic.questionContent.type == 2">
              <div class="choiceMoreItem">
                <el-checkbox-group v-model="userAnswer[index].answer">
                  <div
                    v-for="(op, index) in topic.questionContent.optionsInfo"
                    :key="index"
                    class="chooseItem"
                  >
                    <el-checkbox :label="op.options" disabled></el-checkbox>
                    <span
                      style="height: 30px; font-size: 15px; margin-left: 20px"
                      v-html="op.value"
                      class="checkboxItem"
                    ></span>
                  </div>
                </el-checkbox-group>
              </div>
            </template>
            <!-- 填空简答 -->
            <template
              v-if="
                topic.questionContent.type == 4 ||
                topic.questionContent.type == 5
              "
            >
              <div class="blankItem">
                <div class="inputBlank">
                  <div
                    class="answerAreaBox"
                    v-html="userAnswer[index].answer"
                  ></div>
                </div>
              </div>
            </template>
          </div>
          <div class="result">
            <span class="resultItem"
              >答案：<span
                style="word-break: break-all"
                v-html="answer[index].answer"
              ></span
            ></span>
            <span class="resultItem">
              分值：{{ haveScore[index].questionScore }}分
            </span>
            <span class="resultItem"
              >结果：
              <el-tag
                type="success"
                v-show="
                  haveScore[index].questionScore == haveScore[index].score
                "
                >正确</el-tag
              >
              <span
                v-show="
                  haveScore[index].questionScore != haveScore[index].score &&
                  haveScore[index].score == 0
                "
              >
                <el-tag type="danger">错误</el-tag>/
                <el-tag type="warning">待批改</el-tag>
              </span>
              <el-tag
                type="danger"
                v-show="
                  haveScore[index].questionScore != haveScore[index].score &&
                  haveScore[index].score != 0
                "
                >错误</el-tag
              >
            </span>
            <span class="resultItem">得分：{{ haveScore[index].score }}分</span>
            <span class="resultItem"
              >解析：<span
                style="word-break: break-all"
                v-html="topics[index].questionContent.correct"
              ></span
            ></span>
            <span class="correctNumber"
              >批改：<el-input-number
                v-model="num[index].score"
                :precision="2"
                :step="0.1"
                :max="haveScore[index].questionScore"
                :min="0"
              ></el-input-number
            ></span>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getHomeworkById, submitCorrect } from "@/api/student/yxyAxios";
import store from "@/store"
import router from "@/router"
import jwt_decode from "jwt-decode";
import {
  Container,
  Main,
  Table,
  TableColumn,
  Header,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Aside,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Tag,
  Button,
  Input,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Backtop,
  Rate,
  InputNumber,
  MessageBox,
  Message,
} from "element-ui";
export default {
  name: "CorrectHomework",
  data() {
    return {
      homeworkInfo: "",
      topics: "",
      userAnswer: "",
      haveScore: "",
      answer: "",
      num: "",
      correct: "",
      allScore: 0,
    };
  },
  components: {
    [Container.name]: Container,
    [Main.name]: Main,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Header.name]: Header,
    [Dropdown.name]: Dropdown,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Aside.name]: Aside,
    [Menu.name]: Menu,
    [Submenu.name]: Submenu,
    [MenuItem.name]: MenuItem,
    [MenuItemGroup.name]: MenuItemGroup,
    [Tag.name]: Tag,
    [Button.name]: Button,
    [Input.name]: Input,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [CheckboxGroup.name]: CheckboxGroup,
    [Checkbox.name]: Checkbox,
    [Backtop.name]: Backtop,
    [Rate.name]: Rate,
    [InputNumber.name]: InputNumber,
    [MessageBox.name]: MessageBox,
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    toTopic(idName) {
      document.querySelector(idName).scrollIntoView(true);
    },
    getHomework() {
      let data = {
        homeworkId: this.$route.query.hid,
        studentId: this.$route.query.stuId,
      };
      getHomeworkById(data)
        .then((res) => {
          if (res.status == 200) {
            if (res.data.userAnswer) {
              this.homeworkInfo = res.data.homework;
              this.homeworkInfo.remark = this.homeworkInfo.remark || "无";
              this.topics = res.data.homework.question;
              this.userAnswer = res.data.userAnswer.userAnswer;
              this.haveScore = res.data.correct.deScore;
              this.answer = res.data.homework.answer;
              this.num = res.data.correct.deScore;
              this.correct = res.data.correct;
              for (let i = 0; i < this.homeworkInfo.questionCount; i++) {
                this.allScore += this.topics[i].score;
                this.topics[i].questionContent = JSON.parse(
                  this.topics[i].questionContent
                );
                if (this.topics[i].questionContent.type == 2) {
                  this.userAnswer[i].answer =
                    this.userAnswer[i].answer.split(",");
                }
              }
            } else {
              Message.warning("该用户还未提交作业！");
              setTimeout(() => {
                this.$router.go(-1);
              }, 1000);
            }
          } else {
            Message.error("网络异常，获取试卷失败！");
          }
        })
        .catch((err) => {
          console.log(err);
          Message.error("网络异常，获取试卷失败！");
        });
    },
    submitCorrect() {
      let correct = this.correct;
      correct.deScore = this.num;
      correct.allScore = 0;
      for (let i = 0; i < this.num.length; i++) {
        correct.allScore += this.num[i].score;
      }
      this.$confirm(
        "作业得分为:" + correct.allScore + "分,确认提交批改？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          submitCorrect(correct)
            .then((res) => {
              if (res.status == 200) {
                Message.success("提交成功");
                this.$router.go(-1);
              } else {
                Message.error("网络异常，提交失败");
              }
            })
            .catch((err) => {
              console.log(err);
              Message.error("网络异常，提交失败");
            });
        })
        .catch(() => {
          correct.allScore = 0;
          this.$message({
            type: "info",
            message: "已取消提交",
          });
        });
    },
  },
  beforeRouteEnter(to, from, next) {
    if (jwt_decode(store.state.token).power != 0) {
      //判断当前路由是否需要进行权限控制
      next();
    } else {
      Message.warning("您暂无权限访问");
      router.go(-1)
    }
  },
  mounted(){
    this.getHomework();
  }
};
</script>

<style lang="less" scoped>
html {
  overflow: hidden;
}
.el-header {
  background-color: #8bb4e9;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
  height: 99vh;
  overflow-y: auto;
  overflow-x: hidden;
  div {
    margin: 20px 0;
    width: 190px;
    margin-left: 10px;
  }
}

.content {
  display: flex;
  height: 99vh;
  flex-direction: column;
  overflow: hidden;
  scroll-behavior: smooth;
}

/* 整个滚动条 */
.content ::-webkit-scrollbar {
  /* 对应纵向滚动条的宽度 */
  width: 10px;
  /* 对应横向滚动条的宽度 */
  height: 10px;
}

/* 滚动条上的滚动滑块 */
.content ::-webkit-scrollbar-thumb {
  background-color: #49b1f5;
  border-radius: 32px;
}

/* 滚动条轨道 */
.content ::-webkit-scrollbar-track {
  background-color: #dbeffd;
  border-radius: 32px;
}

.el-main {
  overflow-y: auto;
  flex: 1;
  scroll-behavior: smooth;
}

.paperTitle {
  font-size: 17px;
  font-weight: 500;
}

.paperName {
  font-size: 18px;
  float: left;
  margin-left: 20px;
  /*1. 先强制一行内显示文本*/
  white-space: nowrap;

  /*2. 超出的部分隐藏*/
  overflow: hidden;

  /*3. 文字用省略号替代超出的部分*/
  text-overflow: ellipsis;
}
.paperInfo {
  display: flex;
  height: 100%;
  font-size: 16px;
  color: #666;
  float: right;
  margin-top: 20px;
  span {
    display: inline-block;
    padding: 0 8px;
    height: 30px;
    line-height: 30px;
  }
}
.doResult {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: 1px solid rgb(230, 230, 230);
  border-bottom: 1px solid rgb(230, 230, 230);
  font-size: 15px;
  color: #666;
  text-align: center;
  padding: 20px 0;
  h3 {
    margin-left: 0;
  }
  span {
    margin: 10px 0;
  }
}
.btn {
  width: 100%;
  display: flex;
  justify-content: center;
}

.tagItem {
  width: 30px;
  height: 30px;
  text-align: center;
  margin: 6px;
  cursor: pointer;
}

//题目
.topicPartName {
  display: inline-block;
  width: auto;
  height: 50px;
  line-height: 50px;
  padding: 0 15px;
  background-color: cornflowerblue;
  border-radius: 5px;
  color: aliceblue;
}
.topicItem {
  padding: 35px 0;
}
.choiceItem,
.choiceMoreItem,
.shortAnswerItem {
  margin-top: 15px;
  margin-left: 20px;
}
.inputBlank {
  display: flex;
  align-items: center;
  margin: 15px 0;
  margin-left: 20px;
  .el-input {
    width: 150px;
  }
}
//答题结果
.result {
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  margin-top: 20px;
  font-size: 16px;
  color: rgb(131, 131, 131);
  .resultItem {
    display: flex;
    margin: 5px 0;
  }
  .el-rate {
    display: inline;
  }
}
.answerAreaBox {
  width: 90%;
  min-height: 60px;
  line-height: 30px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.chooseItem {
  display: flex;
  flex-direction: row;
  padding-left: 5px;
}
.remarkArea {
  display: block;
  text-align: center;
  font-size: 14px;
  color: #5b81b2;
  margin: 35px 0;
  line-height: 30px;
  padding: 0 5px;
}
.topicTitle {
  display: flex;
  line-height: 30px;
  word-break: break-all;
}
#goBack {
  font-size: 17px;
  float: left;
  margin-top: 20px;
  cursor: pointer;
}
</style>