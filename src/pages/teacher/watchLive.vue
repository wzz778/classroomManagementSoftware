<template>
  <div id="watchBacSty">
    <div id="operator" ref="operator">
      <button id="release" @click="dialogVisible = true">发布弹幕</button>
      <span style="color: white">弹幕&nbsp;</span>
      <el-switch
        v-model="value1"
        active-color="#13ce66"
        inactive-color="#ff4949"
        @change="changeFn"
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
          <el-input v-model="message" placeholder="请输入弹幕内容"></el-input>
        </el-form-item>
        <el-form-item label="字体颜色">
          <el-color-picker v-model="color"> </el-color-picker>
        </el-form-item>
        <el-form-item label="字体大小">
          <div class="block">
            <el-slider v-model="fontSize" show-input> </el-slider>
          </div>
        </el-form-item>
        <el-form-item label="弹幕速度">
          <div class="block">
            <el-slider v-model="speed" show-input> </el-slider>
          </div>
        </el-form-item>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendBarrage">确 定</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { createPlayUrl, sendMessage } from "@/api/teacher";
import { Switch, ColorPicker, Slider } from "element-ui";
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
      color: "",
      fontSize: 26,
      speed: 1,
    };
  },
  components: {
    [Switch.name]: Switch,
    [ColorPicker.name]: ColorPicker,
    [Slider.name]: Slider,
  },
  methods: {
    watchLiveInit() {
      this.player = TCPlayer("player-container-id", {});
      this.watchLive();
    },
    watchLive() {
      createPlayUrl({
        bizid: this.$route.query.id,
      }).then((result) => {
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
      if (this.speed < 1) {
        this.speed = 1;
      }
      if (this.speed >= 30) {
        this.speed = 30;
      }
      let obj = {
        color: this.color,
        fontSize: this.fontSize,
        speed: this.speed,
        value: this.message,
        time: this.$refs.video.currentTime,
      };
      sendMessage({
        message: JSON.stringify(obj),
        bizid: this.$route.query.id,
      }).then(() => {
        this.clearAll();
      });
      this.dialogVisible = false;
    },
    clearAll() {
      (this.speed = 1), (this.color = ""), (this.message = "");
    },
    barrageInit() {
      this.barage = new Barrage({
        canvas: this.$refs.canvas,
        video: this.$refs.video,
        data: [],
      });
      this.$refs.video.addEventListener("play", () => {
        this.barage.isPlay = true;
        this.barage.render();
      });
      this.$refs.video.addEventListener("pause", () => {
        this.barage.pause();
      });
    },
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
    onmessage(msg) {
      this.barage.setBarrage(JSON.parse(msg.data));
    },
    onerror(err) {
      console.log(err);
      this.$message.error("连接失败");
    },
    onopen() {
      console.log("打开ws：" + this.ws.readyState);
    },
    wsInit() {
      this.ws = new WebSocket(
        `ws://110.40.205.103:8577/webSocket/${this.$route.query.id}`
      );
      this.ws.onmessage = this.onmessage;
      this.ws.onerror = this.onerror;
      this.ws.onopen = this.onopen;
    },
    changeFn(value) {
      if (value) {
        this.barage.isPlay = true;
        this.$refs.canvas.style.display = "";
        this.barage.render();
        return;
      }
      this.barage.isPlay = false;
      // 隐藏canvas
      this.$refs.canvas.style.display = "none";
    },
  },
  mounted() {
    this.$nextTick().then(() => {
      this.watchLiveInit();
      this.barrageInit();
      this.showOperator();
      this.wsInit();
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
  padding: 10px;
  padding-top: 5px;
  background-color: "";
  color: white;
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