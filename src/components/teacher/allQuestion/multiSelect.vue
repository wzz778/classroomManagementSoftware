<template>
  <div>
    <el-form label-width="80px">
      <questionTop :questionStemChangeFn="questionStemChangeFn"></questionTop>
      <!-- 中间内容 -->
      <el-form label-width="80px">
        <el-form-item label="选项:">
          <template v-for="(item, index) in showOptions">
            <el-form-item :label="item.options" :key="index" label-width="50px">
              <el-input
                @click.native="optionsFn(index)"
                v-model="item.value"
                clearable
                placeholder="请选择"
                class="optionsSty"
              ></el-input>
              <el-button
                class="delSty"
                v-if="index == showOptions.length - 1 && index != 1"
                type="danger"
                @click="delFn"
                icon="el-icon-delete"
              ></el-button>
            </el-form-item>
          </template>
        </el-form-item>
        <el-form-item label="标答">
          <el-checkbox-group v-model="trueOptions">
            <template v-for="(item, index) in showOptions">
              <el-checkbox :label="item.options" :key="index">{{
                item.options
              }}</el-checkbox>
            </template>
          </el-checkbox-group>
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
import { Col, Radio, CheckboxGroup, Checkbox } from "element-ui";
import questionTop from "../utilComponents/questionTop.vue";
import questionBottom from "../utilComponents/questBottom.vue";
export default {
  name: "multiSelect",
  components: {
    questionBottom,
    questionTop,
    [Col.name]: Col,
    [Radio.name]: Radio,
    [CheckboxGroup.name]: CheckboxGroup,
    [Checkbox.name]: Checkbox,
  },
  data() {
    return {
      score: 1,
      questionStem: "",
      parsing: "",
      trueOptions: [],
      //   选项
      allOptions: [
        {
          options: "A",
          value: "",
        },
        {
          options: "B",
          value: "",
        },
        {
          options: "C",
          value: "",
        },
        {
          options: "D",
          value: "",
        },
        {
          options: "E",
          value: "",
        },
        {
          options: "F",
          value: "",
        },
        {
          options: "G",
          value: "",
        },
      ],
      showOptions: [
        {
          options: "A",
          value: "",
        },
        {
          options: "B",
          value: "",
        },
        {
          options: "C",
          value: "",
        },
        {
          options: "D",
          value: "",
        },
      ],
    };
  },
  props: ["cancelFn"],
  methods: {
    scoreChangeFn(val) {
      this.score = val;
    },
    // 题干
    questionStemChangeFn(val) {
      this.questionStem = val;
    },
    // 解析改变
    parsingChangeFn(val) {
      this.parsing = val;
    },
    optionsFn(index) {
      this.$myRichText({ oriHtml: this.showOptions[index].value })
        .then((result) => {
          this.showOptions[index].value = result;
        })
        .catch(() => {});
    },
    addOptionsFn() {
      // 添加选项
      this.showOptions.push(this.allOptions[this.showOptions.length]);
    },
    // 删除选项
    delFn() {
      this.showOptions.pop();
    },
    submitFn() {
      if (this.questionStem.replace(/(^\s*)|(\s*$)/g, "") == "") {
        this.$message({
          message: "请输入题干",
          type: "warning",
        });
        return;
      }
      if (this.trueOptions.length == 0) {
        this.$message({
          message: "请选择正确答案",
          type: "warning",
        });
        return;
      }
      for (let i = 0; i < this.showOptions.length; i++) {
        if (this.showOptions[i].value.replace(/(^\s*)|(\s*$)/g, "") == "") {
          this.$message({
            message: `请输入第${i + 1}选项的值`,
            type: "warning",
          });
          return;
        }
      }
      let obj = {
        questionContent: JSON.stringify({
          type: 2,
          topicInfo: this.questionStem,
          optionsInfo: {
            ...this.showOptions,
          },
        }),
        answer: this.trueOptions.toString(),
        correct: this.parsing,
        score: this.score,
        type: 2,
      };
      console.log(obj);
      this.$store.commit("teacher/ADDQUESTION", obj);
      this.cancelFn();
      this.clearAll();
    },
    clearAll() {
      this.score = 1;
      this.questionStem = "";
      this.trueOptions = [];
      this.parsing = "";
      this.showOptions = [
        {
          options: "A",
          value: "",
        },
        {
          options: "B",
          value: "",
        },
        {
          options: "C",
          value: "",
        },
        {
          options: "D",
          value: "",
        },
      ];
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