<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside
      class="siderBar"
      width="200px"
      style="background-color: rgb(238, 241, 246)"
    >
      <div class="paperInfo">
        <div class="paperName">{{ paperData.homeworkName }}</div>
        <div class="timeInterval">
          {{ paperData.beginTime }}~
          <div>{{ paperData.endTime }}</div>
        </div>
      </div>
      <div class="topicTab">
        <h4>题号</h4>
        <a
          v-for="(topic, index) in paperData.questionCount"
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
      <div class="remarkArea">备注：{{ paperData.remark }}</div>
      <div class="btn">
        <el-button type="primary" @click="submitAnswerFun" v-if="userInfo.power=='0'&&correct==null">提交试卷</el-button>
        <el-button type="primary" @click="toBrowseHomework" v-if="userInfo.power=='0'&&correct!=null">查看批改</el-button>
      </div>
    </el-aside>

    <el-container class="content">
      <el-header style="text-align: right; font-size: 12px" class="title">
        <div>
          <i class="el-icon-back" @click="goBack" id="goBack">返回</i>
          <span>总分：{{ allScore }}</span>
        </div>
      </el-header>
      <el-main>
        <div class="topicPart">
          <div v-for="(topic, index) in topics" :key="index">
            <div class="topicItem" :id="'t' + index">
              <div
                class="topicTitle"
                v-html="
                  index +
                  1 +
                  '、' +
                  topic.questionContent.topicInfo +
                  '(' +
                  topic.score +
                  '分)'
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
              </template>
              <!-- 多选 -->
              <template v-if="topic.questionContent.type == 2">
                <div class="choiceMoreItem">
                  <el-checkbox-group v-model="userAnswer[index].answer">
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
                      @click="richTextFun(index, $event)"
                    ></div>
                  </div>
                </div>
              </template>
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
  MessageBox ,
  Tag,
  Button,
  Input,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Backtop,
  Message,
} from "element-ui";
import { getHomeworkById, submitAnswer } from "@/api/student/yxyAxios";
import jwt_decode from "jwt-decode";
export default {
  name: "DoPaper",
  data() {
    return {
      paperData: "",
      topics: "",
      userAnswer: [],
      userInfo:"",
      allScore:0,
      correct:'',
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
    [MessageBox.name]:MessageBox
  },
  methods: {
    // checkMore(val) {
    //   console.log(val);
    // },
    goBack(){
        this.$router.go(-1);
    },
    toBrowseHomework(){
      this.$router.push({path:'/browseHomework',query:{hid:this.$route.query.hid,stuId:this.userInfo.id}})
    },
    toTopic(idName) {
      document.querySelector(idName).scrollIntoView(true);
    },
    submitAnswerFun() {
      let end=new Date(this.paperData.endTime).getTime(new Date(this.paperData.endTime));
      let now=new Date().getTime();
      if(now>end){
        this.$alert('已过截止日期', '提交失败', {
          confirmButtonText: '确定',
          callback: () => {
            this.$message({
              type: 'error',
              message: `提交失败`
            });
          }
        });
      }else{
        this.$confirm("确定提交试卷？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          for (let i = 0; i < this.userAnswer.length; i++) {
            if(this.userAnswer[i].answer instanceof Array){
              this.userAnswer[i].answer=this.userAnswer[i].answer.toString();
            }
          }
          let data = {
            duration: 0,
            hid: this.$route.query.hid,
            id: 0,
            status: 1,
            userAnswer: this.userAnswer,
            userId: this.userInfo.id,
          };
          console.log(data);
          submitAnswer(data).then(res=>{
            if(res.status==200){
              Message.success('提交成功！');
            }else{
              Message.error("网络异常，提交失败！")
            }
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消提交",
          });
        });
      }
    },
    richTextFun(index, event) {
      this.$myRichText({ oriHtml: this.userAnswer[index].answer })
        .then((res) => {
          event.target.innerHTML = res;
          this.userAnswer[index].answer = res;
        })
        .catch(() => {});
    },
  },
  mounted() {
    this.userInfo=jwt_decode(this.$store.state.token);
    let data = {
      homeworkId: this.$route.query.hid,
      studentId:this.$route.query.stuid
    };
    getHomeworkById(data).then((res) => {
      console.log(res);
      this.correct=res.data.correct;
      this.paperData = res.data.homework;
      this.paperData.remark = this.paperData.remark || "无";
      this.topics = res.data.homework.question;
      for (let i = 0; i < this.paperData.questionCount; i++) {
        this.allScore+=this.topics[i].score;
        this.topics[i].questionContent = JSON.parse(
          this.topics[i].questionContent
        );
        if (this.topics[i].questionContent.type == 2) {
          this.userAnswer.push({'answer':[],'type':2})
        } else {
           this.userAnswer.push({'answer':"",'type':this.topics[i].questionContent.type})
        }
      }
    });
  },
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
  line-height: 30px;
  word-break: break-all;
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

.answerAreaBox {
  width: 90%;
  min-height: 60px;
  line-height: 30px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  word-break: break-all;
  &:hover {
    border: 1px solid rgb(139, 180, 233);
  }
}
#goBack{
  font-size: 17px;
  float: left;
  margin-top: 18px;
  cursor: pointer;
}
</style>