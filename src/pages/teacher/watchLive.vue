<template>
  <div id="watchBacSty">
    <div id="operator" ref="operator">
      <button id="release" @click="dialogVisible = true">发布弹幕</button>
      <span style="color: white">弹幕&nbsp;</span>
      <el-switch
        v-model="value1"
        active-color="#13ce66"
        inactive-color="#ff4949"
      >
      </el-switch>
    </div>
    <canvas id="canvas" ref="canvas"></canvas>
    <video
      id="player-container-id"
      preload="auto"
      playsinline
      ref="video"
      webkit-playsinline
    ></video>
    <el-dialog
      ref="dialog"
      title="提示"
      :visible.sync="dialogVisible"
      width="60%"
    >
      <el-form ref="form" label-width="80px">
        <el-form-item label="弹幕内容">
          <el-input v-model="message"></el-input>
        </el-form-item>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendBarrage">确 定</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { createPlayUrl } from "@/api/teacher";
import { Switch } from "element-ui";
import Barrage from "@/utilJs/barrage.js";
export default {
  name: "watchLive",
  data() {
    return {
      watchUrl: "",
      player: null,
      value1: true,
      dialogVisible: false,
      message: "",
      barage: null,
      timer: null,
    };
  },
  components: {
    [Switch.name]: Switch,
  },
  methods: {
    watchLiveInit() {
      this.player = TCPlayer("player-container-id", {});
      this.watchLive();
    },
    watchLive() {
      createPlayUrl({
        bizid: window.localStorage.a,
      }).then((result) => {
        console.log(result);
        this.watchUrl = result;
        this.player.src(this.watchUrl); // url 播放地址
        setTimeout(() => {
          this.$refs.canvas.nextElementSibling.appendChild(this.$refs.canvas);
          this.$refs.canvas.parentElement.appendChild(this.$refs.operator);
          this.$refs.canvas.parentElement.appendChild(this.$refs.dialog.$el);
        }, 1000);
      });
    },
    sendBarrage() {
      console.log("发送弹幕");
      this.barage.setBarrage({
        color: "red",
        fontSize: 26,
        speed: 1,
        value: this.message,
        time: this.$refs.video.currentTime,
      });
      this.dialogVisible = false;
    },
    barrageInit() {
      this.barage = new Barrage({
        canvas: this.$refs.canvas,
        video: this.$refs.video,
        data: this.getDate(1),
      });
      this.$refs.video.addEventListener("play", () => {
        this.barage.isPlay = true;
        this.barage.render();
      });
      this.$refs.video.addEventListener("pause", () => {
        this.barage.pause();
      });
    },
    getDate(len) {
      let data = [];
      /* 一个弹幕数据中需要有弹幕的具体值，弹幕的字体大小，弹幕的颜色，它出现在视频中的时间，以及他的速度
       */
      for (let i = 0; i < len; i++) {
        data.push({
          value: `第${i}条弹幕`,
          fontSize: 26,
          color: "red",
          time: i * 2,
          speed: 1,
        });
      }
      return data;
    },
    move() {},
    showOperator() {
      this.$refs.video.onmouseleave = () => {
        this.$refs.operator.style.display = "block";
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          this.$refs.operator.style.display = "none";
        }, 4000);
      };
      // this.$refs.canvas.onmouseleave = this.move();
    },
  },
  mounted() {
    this.$nextTick().then(() => {
      this.watchLiveInit();
      this.barrageInit();
      this.showOperator();
    });
  },
};
</script>

<style scoped>
#watchBacSty {
  width: 100%;
  height: 100vh;
  background-color: black;
  position: relative;
}

#operator {
  position: absolute;
  left: 200px;
  bottom: -5px;
  z-index: 100;
}

#release {
  cursor: pointer;
  margin-bottom: 10px;
  padding: 6px;
}

#canvas {
  width: 90%;
  height: 88%;
  position: fixed;
  /* z-index: 10; */
  margin: 0 auto;
  top: 0;
}

#player-container-id {
  display: block;
  width: 100%;
  height: 99vh;
  margin: 0 auto;
  position: absolute;
}
</style>