<template>
  <div>
    <el-form-item label="题干">
      <el-input
        v-model="questionInfo"
        @click.native="parsingFn"
        placeholder="请输入"
      ></el-input>
    </el-form-item>
  </div>
</template>

<script>
import { Col } from "element-ui";
export default {
  name: "questionTop",
  props: ["questionStemChangeFn"],
  components: {
    [Col.name]: Col,
  },
  data() {
    return {
      questionInfo: "",
    };
  },
  methods: {
    parsingFn() {
      this.$myRichText({ oriHtml: this.questionInfo })
        .then((result) => {
          this.questionInfo = result;
          this.questionStemChangeFn(result);
        })
        .catch(() => {});
    },
    clearAll() {
      this.questionInfo = "";
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
.el-input {
  width: 80%;
}
</style>