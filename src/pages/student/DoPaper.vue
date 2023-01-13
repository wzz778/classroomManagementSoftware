<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside class="siderBar" width="200px" style="background-color: rgb(238, 241, 246)">
      <div class="paperInfo">
        <div class="paperName">202301013试卷</div>
        <div class="paperCourse">线性代数</div>
        <div class="timeInterval">2023/01/01~2023/01/03</div>
      </div>
      <div class="topicTab">
        <h4>题号</h4>
        <a
          v-for="(topic, index) in topics.questions"
          :key="index"
          @click="toTopic('#t' + index)"
        >
          <el-tag
            :type="
              userAnswer[index] == '' || userAnswer[index] == []
                ? 'info'
                : 'success'
            "
            class="tagItem"
            >{{ index + 1 }}</el-tag
          >
        </a>
      </div>
      <div class="remarkArea">备注：这是一个试卷这是一个试卷这是一个试卷这是一个试卷这是一个试卷这是一个试卷</div>
      <div class="btn">
        <el-button type="primary" @click="submitAnswer">提交试卷</el-button>
      </div>
    </el-aside>

    <el-container class="content">
      <el-header style="text-align: right; font-size: 12px" class="title">
        <div class="paperTimeInfo">
          <!-- <span style="border-right: 1px solid rgb(202, 199, 199)"
            >时长：{{ paperData.suggestTime }}分钟</span
          > -->
          <span>总分：{{ paperData.paperScore }}</span>
        </div>
      </el-header>
      <el-main>
        <div class="topicPart">
          <div v-for="(topic, index) in topics.questions" :key="index">
            <h3 class="topicPartName" v-if="titles.hasOwnProperty(index)">
              {{ titles[index] }}
            </h3>
            <!-- 单选 -->
            <div
              class="topicItem"
              :id="'t' + index"
              v-if="topic.questionContent.type == 1"
            >
              <div
                class="topicTitle"
                v-html="index + 1 + '、' + topic.questionContent.topicInfo"
              ></div>
              <div class="choiceItem">
                <el-radio-group v-model="userAnswer[index]">
                  <div
                    v-for="(op, index) in topic.questionContent.optionsInfo"
                    :key="index"
                    class="radioItem"
                  >
                    <el-radio :label="op.options"></el-radio>
                    <span
                      style="height: 30px; font-size: 15px"
                      v-html="op.value"
                    ></span>
                  </div>
                </el-radio-group>
              </div>
            </div>
            <!-- 多选 -->
            <div
              class="topicItem"
              :id="'t' + index"
              v-if="topic.questionContent.type == 2"
            >
              <div class="topicItem">
                <div
                  class="topicTitle"
                  v-html="index + 1 + '、' + topic.questionContent.topicInfo"
                ></div>
                <div class="choiceMoreItem">
                  <el-checkbox-group v-model="userAnswer[index]">
                    <div
                      v-for="(op, index) in topic.questionContent.optionsInfo"
                      :key="index"
                      class="radioItem"
                    >
                      <el-checkbox :label="op.options"></el-checkbox>
                      <span
                        style="height: 30px; font-size: 15px"
                        v-html="op.value"
                        class="checkboxItem"
                      ></span>
                    </div>
                  </el-checkbox-group>
                </div>
              </div>
            </div>
            <!-- 判断 -->
            <div
              class="topicItem"
              :id="'t' + index"
              v-if="topic.questionContent.type == 3"
            >
              <div class="topicItem">
                <div
                  class="topicTitle"
                  v-html="index + 1 + '、' + topic.questionContent.topicInfo"
                ></div>
                <div class="shortAnswerItem">
                  <el-radio-group
                    v-model="userAnswer[index]"
                    @change="judgeFun"
                  >
                    <el-radio :label="false">错误</el-radio>
                    <el-radio :label="true">正确</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </div>

            <!-- 填空 -->
            <div
              class="topicItem"
              :id="'t' + index"
              v-if="topic.questionContent.type == 4"
            >
              <div class="topicItem">
                <div
                  class="topicTitle"
                  v-html="index + 1 + '、' + topic.questionContent.topicInfo"
                ></div>
                <div class="blankItem">
                  <div class="inputBlank">
                    <el-input
                      type="textarea"
                      :rows="2"
                      placeholder="请输入内容"
                      v-model="userAnswer[index]"
                    >
                    </el-input>
                  </div>
                </div>
              </div>
            </div>
            <!-- 简答 -->
            <div
              class="topicItem"
              :id="'t' + index"
              v-if="topic.questionContent.type == 5"
            >
              <div class="topicItem">
                <div
                  class="topicTitle"
                  v-html="index + 1 + '、' + topic.questionContent.topicInfo"
                ></div>
                <div class="shortAnswerItem">
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="userAnswer[index]"
                  >
                  </el-input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
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
} from "element-ui";
// import { getPapers } from "@/myAxios/user/yxyAxios";
export default {
  name: "DoPaper",
  data() {
    return {
      paperData: "",
      topics: "",
      titles: {},
      userAnswer: {},
      // hr: "",
      // min: "",
      // sec: "",
      // count:''
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
  },
  methods: {
    // checkMore(val) {
    //   console.log(val);
    // },
    judgeFun(val) {
      console.log(val);
    },
    toTopic(idName) {
      document.querySelector(idName).scrollIntoView(true);
    },
    submitAnswer() {
      console.log(this.userAnswer);
    },
    //倒计时
    // countdown() {
    //   const end = Date.parse(new Date("2022-12-12 19:59:23"));
    //   const now = Date.parse(new Date());
    //   const msec = end-now;
    //   console.log(this.count);
    //   console.log("msec",msec);
    //   if (msec < 0) return;
    //   let day = parseInt(msec / 1000 / 60 / 60 / 24);
    //   let hr = parseInt((msec / 1000 / 60 / 60) % 24);
    //   let min = parseInt((msec / 1000 / 60) % 60);
    //   let sec = parseInt((msec / 1000) % 60);
    //   this.day = day;
    //   this.hr = hr > 9 ? hr : "0" + hr;
    //   this.min = min > 9 ? min : "0" + min;
    //   this.sec = sec > 9 ? sec : "0" + sec;
    //   const that = this;
    //   if (min >= 0 && sec >= 0) {
    //     //倒计时结束关闭订单
    //     if (min == 0 && sec == 0) {
    //       return;
    //     }
    //     setTimeout(function () {
    //       that.countdown();
    //     }, 1000);
    //   }
    // },
  },
  // mounted() {
  //   let getPaperInfo = {
  //     beginIndex: 1,
  //     size: 1,
  //     id: this.$route.query.pid,
  //   };
  //   getPapers(getPaperInfo).then((res) => {
  //     console.log(res.data);
  //     this.paperData = res.data.records[0];
  //     this.topics = this.paperData.ob;
  //     this.count = this.paperData.suggestTime;
  //     for (let i = 0; i < this.topics.questions.length; i++) {
  //       this.topics.questions[i].questionContent = JSON.parse(
  //         this.topics.questions[i].questionContent
  //       );
  //       if (this.topics.questions[i].questionContent.type == 2) {
  //         this.$set(this.userAnswer, i, []);
  //       } else {
  //         this.$set(this.userAnswer, i, "");
  //       }
  //     }
  //     Object.values(JSON.parse(res.data.records[0].paperFrame)).forEach(
  //       (key) => {
  //         this.titles[key.beginIndex] = key.value;
  //       }
  //     );
  //   });
  // },
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
    width: 190px;
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
  border-radius: 32px;
}

/* 滚动条轨道 */
 ::-webkit-scrollbar-track {
  background-color: #dbeffd;
  border-radius: 32px;
}

.content {
  display: flex;
  height: 99vh;
  flex-direction: column;
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
}
.paperInfo {
  display: flex;
  flex-direction: column;
  height: 200px;
  font-size: 16px;
  color: #666;
  float: right;
  div {
    display: inline-block;
    width: 100%;
    text-align: center;
    height: 30px;
    line-height: 30px;
    margin-top: 15px;
  }
  .timeInterval {
    font-size: 13px;
  }
}
.countDown {
  width: 90%;
  margin-left: 5%;
  border-top: 1px solid rgb(230, 230, 230);
  border-bottom: 1px solid rgb(230, 230, 230);
  font-size: 15px;
  color: #666;
  text-align: center;
  padding: 20px 0;
}
.time {
  font-size: 17px;
  color: red;
  margin-top: 10px;
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
.checkboxItem {
  margin-left: 20px;
}
.topicTitle {
  display: flex;
  span {
    line-height: 30px;
  }
}
.radioItem {
  display: flex;
  align-items: center;
  span {
    line-height: 30px;
  }
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

.remarkArea {
  display: block;
  text-align: center;
  font-size: 14px;
  color: #5b81b2;
  margin: 35px 0;
  line-height: 30px;
  padding: 0 5px;
}

.topicTab {
  h4 {
    text-align: center;
  }
}
</style>