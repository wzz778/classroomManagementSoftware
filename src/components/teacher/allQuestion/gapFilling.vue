<template>
  <div>
    <el-form label-width="80px">
      <questionTop :questionStemChangeFn="questionStemChangeFn"></questionTop>
      <!-- 中间内容 -->
      <el-form label-width="80px">
        <el-form-item style="width: 82%" label="标答">
          <el-input
            v-model="trueOptions"
            placeholder="请输入"
            @click.native="optionsFn"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- 选择框 -->
      <questionBottom
        :scoreChangeFn="scoreChangeFn"
        :parsingChangeFn="parsingChangeFn"
      ></questionBottom>
      <el-form-item>
        <el-col>
          <el-button type="primary" @click="submitFn">确定</el-button>
          <el-button @click="cancelFn">取消</el-button>
          <el-button type="success" @click="addOptionsFn">添加选项</el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Col, Radio } from "element-ui";
import questionTop from "../utilComponents/questionTop.vue";
import questionBottom from "../utilComponents/questBottom.vue";
export default {
  name: "gapFilling",
  components: {
    questionBottom,
    questionTop,
    [Col.name]: Col,
    [Radio.name]: Radio,
  },
  props: ["cancelFn"],
  data() {
    return {
      score: 1,
      questionStem: "",
      trueOptions: "",
      parsing: "",
    };
  },
  methods: {
    scoreChangeFn(val) {
      this.score = val;
    },
    // 题干
    questionStemChangeFn(val) {
      this.questionStem = val;
    },
    addOptionsFn() {
      if (this.showOptions.length == this.allOptions.length) {
        return;
      }
      // 添加选项
      this.showOptions.push(this.allOptions[this.showOptions.length]);
    },
    // 删除选项
    delFn() {
      this.showOptions.pop();
    },
    // 选项内容
    optionsFn() {
      this.$myRichText({ oriHtml: this.trueOptions })
        .then((result) => {
          this.trueOptions = result;
        })
        .catch(() => {});
    },
    // 解析改变
    parsingChangeFn(val) {
      this.parsing = val;
    },
    submitFn() {
      if (this.questionStem.replace(/(^\s*)|(\s*$)/g, "") == "") {
        this.$message({
          message: "请输入题干",
          type: "warning",
        });
        return;
      }
      if (this.trueOptions.replace(/(^\s*)|(\s*$)/g, "") == "") {
        this.$message({
          message: "请输入正确答案",
          type: "warning",
        });
        return;
      }
      let obj = {
        questionContent: JSON.stringify({
          type: 4,
          topicInfo: this.questionStem,
        }),
        answer: this.trueOptions.toString(),
        correct: this.parsing,
        score: this.score,
        type: 4,
      };
      this.$store.commit("teacher/ADDQUESTION", {
        data: obj,
        answer: {
          answer: this.trueOptions.toString(),
          type: 4,
        },
      });
      this.cancelFn();
      this.clearAll();
    },
    clearAll() {
      this.score = 1;
      this.questionStem = "";
      this.trueOptions = "";
      this.parsing = "";
      this.$bus.$emit("clearAll");
    },
  },
};
</script>

<style scoped>
.optionsSty {
  margin-bottom: 10px;
  width: 30%;
}

.delSty {
  padding: 10px;
  margin-left: 20px;
}
</style>