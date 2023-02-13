<template>
  <div style="background: white">
    <el-button type="text" @click="open">回答问题</el-button>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <div class="dialogSty">
        <el-form label-width="80px">
          <el-form-item label="答案">
            <el-input clearable v-model="content"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialogOperator">
        <el-button @click="dialogVisible = false" type="">取消</el-button>
        <el-button @click="zanswer" type="">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ZQuestion, ZAnswer } from "@/api/user/index";
export default {
  name: "UserAnwser",
  data() {
    return {
      content: "",
      dialogVisible: false,
    };
  },
  methods: {
    open() {
      this.dialogVisible = true;
      let data = {
        union: "",
      };
      ZQuestion(data).then(() => {
        // console.log("获取课堂问题");
      });
    },
    zanswer() {
      this.dialogVisible = false;
      let data = {
        union: "",
        answer: "",
      };
      ZAnswer(data).then(() => {
        // 
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style  lang="less" scoped>
</style>