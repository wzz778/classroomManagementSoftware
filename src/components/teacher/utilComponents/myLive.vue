<template>
  <div class="liveBtnSty">
    <el-button
      v-if="!livePusher || !livePusher.isPushing()"
      type="primary"
      @click="liveInit"
      >开启直播</el-button
    >
    <template v-if="livePusher && livePusher.isPushing()">
      <el-button type="primary" @click="stopLive">关闭直播</el-button>
    </template>
  </div>
</template>

<script>
import { createPushUrl } from "@/api/teacher/";
export default {
  name: "liveUtil",
  data() {
    return {
      livePusher: null,
      pushUrl: "",
    };
  },
  methods: {
    liveInit() {
      // 获取推流地址
      createPushUrl()
        .then((result) => {
          console.log(result);
          this.pushUrl = result.replace("rtmp", "webrtc");
          this.livePusher = new TXLivePusher();
          this.startLive();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    startLive() {
      this.livePusher.setVideoQuality("720p");
      this.livePusher.setAudioQuality("standard");
      this.livePusher.setProperty("setVideoFPS", 25);
      // 采集视频并推流
      Promise.all([
        this.livePusher.startScreenCapture(),
        this.livePusher.startMicrophone(),
      ]).then(() => {
        this.livePusher.startPush(this.pushUrl).then(() => {
          console.log("pushing");
        });
      });
    },
    stopLive() {
      this.$confirm("大量观众正在路上, 是否确定关闭直播?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.livePusher.stopPush();
          this.livePusher.stopMicrophone();
          this.livePusher.stopScreenCapture();
          this.$message({
            type: "info",
            message: "已关闭",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {},
};
</script>

<style scoped>
.liveBtnSty {
  display: inline-block;
  margin-left: 15px;
}
</style>