<template>
  <div>
    <el-form-item label="解析">
      <el-input
        placeholder="请输入内容"
        v-model="analysis"
        @click.native="parsingFn"
      ></el-input>
    </el-form-item>
    <el-form-item label="分数">
      <el-input-number
        v-model="num"
        @change="scoreChangeFn(num)"
        :min="0"
        :max="100"
        label="描述文字"
      ></el-input-number>
    </el-form-item>
  </div>
</template>

<script>
import { Col, InputNumber } from "element-ui";
export default {
  name: "questionBottom",
  //  解析先不搞,分数改变的函数，难度改变的函数，知识点改变的函数
  props: [
    "scoreChangeFn",
    "difficultyChangeFn",
    "knowledgeChangeFn",
    "knowledge",
    "parsingChangeFn",
  ],
  components: {
    [Col.name]: Col,
    [Option.name]: Option,
    [InputNumber.name]: InputNumber,
  },
  data() {
    return {
      analysis: "",
      num: 1,
    };
  },
  methods: {
    parsingFn() {
      this.$myRichText({ oriHtml: this.analysis })
        .then((result) => {
          this.analysis = result;
          this.parsingChangeFn(result);
        })
        .catch(() => {});
    },
    clearAll() {
      this.analysis = "";
      this.num = 1;
    },
  },
  mounted() {
    this.$bus.$on("clearAll", this.clearAll);
  },
  beforeDestroy() {
    this.$bus.$off("clearAll");
  },
};
</script>

<style scoped>
.from {
  position: relative;
}

.el-rate {
  margin-top: 10px;
}

.el-input {
  width: 80%;
}

.el-select {
  width: 80%;
}
</style>