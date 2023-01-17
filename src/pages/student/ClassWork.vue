<template>
  <div class="work">
    <div class="workTop">
      <span>高等数学</span>
    </div>
    <div class="state">
      <span>筛选</span>
      <el-radio v-model="radio" label="1">全部</el-radio>
      <el-radio v-model="radio" label="2">已完成</el-radio>
      <el-radio v-model="radio" label="3">未完成</el-radio>
    </div>
    <div class="zuo">
      <el-card class="box-card">
        <div v-for="o in 4" :key="o" class="text item">
          <div class="name">
            <img :src="adatar ? adatar : require('@/assets/work.jpeg')" />
          </div>
          <div class="name">
            <p>{{ "新建作业 " + o }}</p>
            <p>已完成</p>
            </div>
        </div>
      </el-card>
    </div>
    <div class="fen">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5,10, 15, 20]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="40">
    </el-pagination>
    </div>
  </div>
</template>

<script>
import { Radio, Card } from "element-ui";
export default {
  name: "ClassWork",
  data() {
    return {
      radio: "1",
      adatar: "",
      currentPage: 1,
    };
  },
  components: {
    [Radio.name]: Radio,
    [Card.name]: Card,
  },
      methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },

};
</script>

<style lang="less" scoped>
.work {
  width: 95%;
  min-height: 450px;
  margin-bottom: 50px;
  background: white;
  border-radius: 8px;
  margin: 0 auto;
  padding-bottom: 20px;
  .workTop {
    line-height: 50px;
    padding-left: 2em;
    border-bottom: 1.5px solid #3a39392b;
  }
  .state {
    line-height: 45px;
    padding-left: 2em;
    span {
      margin-right: 30px;
    }
  }
  .fen{
  height: 40px;
  line-height: 40px;
  padding-left: 2em;
  }
}
.text {
  font-size: 14px;
}

.item {
  padding-left: 1em;
  line-height: 54px;
  display: flex;
  border-bottom: 1px solid #3a39392b;
}

.box-card {
  width: 100%;
}
.el-card.is-always-shadow {
  box-shadow: none;
}
.el-card {
  border: none;
}
.name{
height: 54px;
line-height: 54px;
p{
height: 24px;
line-height: 24px;
}
}
img{
width: 40px;
height: 40px;
margin: 7px 15px 7px 0px ;
}
</style>