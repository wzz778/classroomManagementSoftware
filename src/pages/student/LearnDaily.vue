<template>
  <div class="mainBox">
    <div class="signInBox">
      <div class="beforeBox">
        <i class="el-icon-date"></i>
        <span class="title">签到</span>
      </div>
      <div class="numBox">20/25<span :style="wordStyle">次</span></div>
      <el-progress type="circle" :percentage="25" :format="format" style=" white-space: pre;"></el-progress>
    </div>
    <div class="homeworkBox">
        <div class="beforeBox">
        <i class="el-icon-edit-outline" style="color:#fdb765"></i>
        <span class="title">作业</span>
      </div>
      <div class="numBox">20/25<span :style="wordStyle">次</span></div>
      <el-progress type="circle" :percentage="25" color="#fdb765" :format="format" style=" white-space: pre;"></el-progress>
    </div>
    <div class="discussionBox">
        <div class="beforeBox">
        <i class="el-icon-s-comment" style="color:#ff6d59"></i>
        <span class="title">讨论</span>
      </div>
      <div class="numBox">20/25<span :style="wordStyle">次</span></div>
      <el-progress type="circle" :percentage="25" color="#ff6d59" :format="format" style=" white-space: pre;"></el-progress>
    </div>
    <div class="integralBox">
        <div class="beforeBox">
        <i class="el-icon-s-marketing" style="color:#4ad994"></i>
        <span class="title">积分</span>
      </div>
      <div></div>
      <div class="numBox">100分</div>
    </div>
  </div>
</template>

<script>
import { Progress } from "element-ui";
export default {
  name: "LearnDaily",
  data() {
    return {
        wordStyle:{
            fontSize:"22px",
            color:"#666"
        }
    };
  },
  methods: {
    format() {
      return  `完成率`+'\n'+`40%`
    },
  },
  components: {
    [Progress.name]: Progress,
  },
};
</script>

<style lang="less" scoped>
.mainBox {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px 0;
  justify-items: center;
  width: 100%;
  .signInBox,
  .integralBox,
  .homeworkBox,
  .discussionBox {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 80%;
    height: 200px;
    background-color: #fff;
  }
  .signInBox {
    border-radius: 10px;
    margin-top: 50px;
    border: 1px solid #59bcff;
    // background: linear-gradient(45deg, #59bcff 21%, #59d7ff 100%);
  }
  .beforeBox{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    i{
        font-size: 50px;
        color: #59bcff;
    }
    .title{
        color: #666;
        font-size: 25px;
        font-weight: 700;
        line-height: 40px;
    }
  .integralBox {
    border-radius: 10px;
    border: 1px solid #4ad994;
    // background: linear-gradient(45deg, #4ad994 0%, rgb(185, 230, 162) 100%);
  }
  .homeworkBox {
    margin-top: 50px;
    border-radius: 10px;
    border: 1px solid #fdb765;
    // background: linear-gradient(45deg, #fdb765 0%, #ffe485 100%);
  }
  .discussionBox {
    border-radius: 10px;
    border: 1px solid #ff6d59;
    // background: linear-gradient(45deg, #ff6d59 0%, #ffd584 100%);
  }
}
</style>