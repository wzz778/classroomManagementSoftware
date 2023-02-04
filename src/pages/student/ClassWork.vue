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
      <el-card class="box-card" v-show="radio == '1'">
        <div v-for="o in enter" :key="o.id" class="text item">
          <div class="name">
            <img :src="adatar ? adatar : require('@/assets/work.jpeg')" />
          </div>
          <div class="name">
            <span>{{ o.homeworkName }}</span>
            <span class="tasktime" v-show="new Date(o.beginTime) > new Date()">开始时间：{{ o.beginTime }}</span
            >
            <span class="tasktime" v-show="new Date(o.beginTime) <= new Date()">结束时间：{{ o.endTime }}</span
            >
          </div>
        </div>
      </el-card>
      <el-card class="box-card" v-show="radio == '2'">
        <div v-for="o in endc" :key="o.id" class="text item">
          <div class="name">
            <img :src="adatar ? adatar : require('@/assets/work.jpeg')" />
          </div>
          <div class="name">
            <span>{{ o.homeworkName }}</span>
            <span class="tasktime" v-show="new Date(o.beginTime) > new Date()">开始时间：{{ o.beginTime }}</span
            >
            <span class="tasktime" v-show="new Date(o.beginTime) <= new Date()">结束时间：{{ o.endTime }}</span
            >
          </div>
        </div>
      </el-card>
      <el-card class="box-card" v-show="radio == '3'">
        <div v-for="o in nostat" :key="o.id" class="text item">
          <div class="name">
            <img :src="adatar ? adatar : require('@/assets/work.jpeg')" />
          </div>
          <div class="name">
            <span>{{ o.homeworkName }}</span>
            <span class="tasktime" v-show="new Date(o.beginTime) > new Date()">开始时间：{{ o.beginTime }}</span
            >
            <span class="tasktime" v-show="new Date(o.beginTime) <= new Date()">结束时间：{{ o.endTime }}</span
            >
          </div>
        </div>
      </el-card>
    </div>
    <div class="fen">
      <el-pagination
        v-show="radio == '1'"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="enter.length"
      >
      </el-pagination>
      <el-pagination
        v-show="radio == '2'"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="endc.length"
      >
      </el-pagination>
      <el-pagination
        v-show="radio == '3'"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="nostat.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { Radio, Card } from "element-ui";
import { ZgetHomework } from "@/api/user/index";
export default {
  name: "ClassWork",
  data() {
    return {
      radio: "1",
      adatar: "",
      cid: this.$route.query.id,
      //作业
      nostat: [],
      endc: [],
      enter: [],
      limit: 5,
      currentPage: 1,
    };
  },
  components: {
    [Radio.name]: Radio,
    [Card.name]: Card,
  },
  mounted: function () {
    this.handleCurrentChange();
  },
  methods: {
    //默认查询第一页
    handleCurrentChange(pager = 1) {
      this.endc = [];
      this.nostat = [];
      this.enter = [];
      this.currentPage = pager;
      //解构出参数
      const { currentPage, limit } = this;
      let data = {
        beginIndex: this.currentPage,
        courseId: this.cid,
        size: this.limit,
      };
      ZgetHomework(data).then((result) => {
        console.log("取出课程作业", result);
        if (result.msg == "OK") {
          if (result.data.total == 0) {
            this.$message({
              type: "success",
              message: "暂无作业",
            });
          } else {
            this.enter = result.data.records;
            for (let i = 0; i < result.data.records.length; i++) {
              if (result.data.records[i].answer.length == 0) {
                this.nostat.push(result.data.records[i]);
              } else {
                this.endc.push(result.data.records[i]);
              }
            }
          }
        } else {
          this.$message.error("暂无作业");
        }
      });
    },
    handleSizeChange(limit) {
      //整理参数
      this.limit = limit;
      this.handleCurrentChange();
    },
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
  .fen {
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
.name {
  height: 54px;
  line-height: 54px;
  .tasktime {
    position: absolute;
    right: 5%;
    color: rgb(139, 141, 143);
    font-size: 13px;
  }
}
img {
  width: 40px;
  height: 40px;
  margin: 7px 15px 7px 0px;
}
</style>