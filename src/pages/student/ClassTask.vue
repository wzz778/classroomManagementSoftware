<template>
  <div>
    <div class="task" v-show="check == '任务'">
      <div class="taskTop">
        <span>高等数学</span>
      </div>
      <div class="taskState">
        <span>未开始(3)</span>
      </div>
      <div class="zuo">
        <el-card class="box-card">
          <div
            v-for="o in 3"
            :key="o"
            class="text item"
            @click="check = '签到未开始'"
          >
            <div class="name">
              <img
                :src="adatar ? adatar : require('@/assets/yxy/classPic.jpg')"
              />
            </div>
            <div class="name">
              <span> {{ "任务尚未开始 " + o }}</span>
              <span class="tasktime">开始时间：2023-1-20</span>
            </div>
          </div>
        </el-card>
      </div>
      <div class="taskState">
        <span>进行中(4)</span>
      </div>
      <div class="zuo">
        <el-card class="box-card">
          <div
            v-for="o in 4"
            :key="o"
            class="text item"
            @click="check = '签到中'"
          >
            <div class="name">
              <img
                :src="adatar ? adatar : require('@/assets/yxy/classPic.jpg')"
              />
            </div>
            <div class="name">
              <span> {{ "任务进行中 " + o }}</span>
              <span class="tasktime">截至时间：2023-1-22</span>
            </div>
          </div>
        </el-card>
      </div>
      <div class="taskState">
        <span>已结束(5)</span>
      </div>
      <div class="zuo">
        <el-card class="box-card">
          <div
            v-for="o in 5"
            :key="o"
            class="text item"
            @click="check = '签到结束'"
          >
            <div class="name">
              <img
                :src="adatar ? adatar : require('@/assets/yxy/classPic.jpg')"
              />
            </div>
            <div class="name">
              <span> {{ "签到已结束 " + o }}</span>
              <span class="tasktime">截止时间：2023-1-12</span>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <div class="qian">
      <SignIn v-show="check != '任务'" :check="check" @changeMsg="changeMsg" />
    </div>
  </div>
</template>

<script>
import { Card } from "element-ui";
import SignIn from "@/components/student/CourseInfo/SignIn";
export default {
  name: "ClassTask",
  data() {
    return {
      radio: "1",
      adatar: "",
      check: "任务",
      cid: this.$route.query.id
    };
  },
  components: {
    [Card.name]: Card,
    SignIn,
  },
  methods: {
    changeMsg(text, value) {
      console.log(text, value);
      this.check = value;
    },
  },
};
</script>

<style lang="less" scoped>
.task {
  width: 95%;
  min-height: 450px;
  margin-bottom: 50px;
  background: white;
  border-radius: 8px;
  margin: 0 auto;
  padding-bottom: 20px;
  .taskTop {
    line-height: 50px;
    padding-left: 2em;
    border-bottom: 1.5px solid #3a39392b;
  }
  .taskState {
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
.item:hover{
cursor: pointer;
}
.box-card {
  width: 100%;
}
.el-card.is-always-shadow {
  box-shadow: none;
}
.el-card {
  border: none;
  position: relative;
}
.name {
  height: 54px;
  line-height: 54px;
}
img {
  width: 40px;
  height: 40px;
  margin: 7px 15px 7px 0px;
}
.tasktime {
  position: absolute;
  right: 4%;
  color: rgb(139, 141, 143);
  font-size: 12px;
}
.el-card ::v-deep .el-card__body {
  padding-top: 0px;
}
</style>