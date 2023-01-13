<template>
  <div class="memebers">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="el-icon-s-custom"></i><span>教师（4人）</span>
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        <div class="name"><img :src="adatar ? adatar : require('@/assets/bac01.jpeg')" /></div>
        <div class="name">{{ "教师 " + o }}</div>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="el-icon-user-solid"></i><span>学生（30人）</span>
      </div>
      <div v-for="o in 30" :key="o" class="text item">
        <div class="name"><img :src="adatar ? adatar : require('@/assets/01.jpg')" /></div>
        <div class="name">{{ "学生 " + o }}</div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { Card } from "element-ui";
export default {
  name: "ClassMebers",
  data() {
    return {
      adatar: "",
    };
  },
  components: {
    [Card.name]: Card,
  },
};
</script>

<style scoped>
.members {
  width: 100%;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
  line-height: 40px;
  display: flex;
  padding-left: 10px;
  border-bottom: 1px solid rgb(64 62 62 / 18%);
}
.name{
line-height: 40px;
margin-left: 10px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  width: 95%;
  margin: 30px auto;
}
img{
width: 40px;
height: 40px;
border-radius: 50%;
}
i{
margin-right: 6px;
color: rgb(21, 21, 169);
font-size: 18px;
}
</style>