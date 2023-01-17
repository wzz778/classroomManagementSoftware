<template>
  <div class="mainBox">
      <p>请写明注销理由：</p>
      <el-input
        type="textarea"
        placeholder="不超过150字"
        v-model="cancellationReason"
        maxlength="150"
        show-word-limit
        :autosize="{minRows:4}"
      >
      </el-input>
      <el-button class="cancellationBtn" type="primary">提交</el-button>
  </div>
</template>

<script>
export default {
  name: "AccountCancellation",
  data() {
    return {
      cancellationReason: "",
      textareaStyle: {
        maxWidth:'600px',
        minHeight: "100px",
        height: "auto",
      },
    };
  },
};
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
}
.mainBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}
p {
  margin: 20px 0;
  color: cornflowerblue;
}
.el-input {
  max-width: 600px;
}

.cancellationBtn{
  display: inline-block;
  width: 100px;
  height: 30px;
  margin-top: 50px;
}
</style>