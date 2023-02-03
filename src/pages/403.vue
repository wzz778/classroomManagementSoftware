<template>
  <div class="textSty">
    <h1>403</h1>
    <div class="noPower">对不起您没有权限访问该页面</div>
    <el-button @click="backLast">返回上一页</el-button>
  </div>
</template>

<script>
export default {
  name: "noPower",
  methods: {
    backLast() {
      this.$router.go(-2);
    },
  },
};
</script>

<style scoped>
.textSty {
  text-align: center;
  margin-top: 100px;
}

h1 {
  margin-bottom: 30px;
}

.noPower {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>