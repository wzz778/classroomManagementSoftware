<template>
  <div class="textSty">
    <h1>404</h1>
    <div class="noPower">对不起您找的页面不存在</div>
    <el-button @click="backLast">返回上一页</el-button>
  </div>
</template>

<script>
export default {
  name: "noPage",
  methods: {
    backLast() {
      this.$router.go(-1);
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