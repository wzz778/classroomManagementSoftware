<template>
  <div class="liveBtnSty">
    <div class="myOperator">
      <el-button
        style="padding: 11px"
        v-if="!livePusher || !livePusher.isPushing()"
        type="primary"
        @click="liveInit"
        >开启直播</el-button
      >
      <template v-if="livePusher && livePusher.isPushing()">
        <el-button type="primary" @click="stopLive" style="padding: 11px"
          >关闭直播</el-button
        >
      </template>
      <el-button type="success" style="padding: 11px" @click="getRandomName"
        >随机点名</el-button
      >
      <el-button @click="dialogVisible = true" type="info" style="padding: 11px"
        >发布问题</el-button
      >
      <el-button
        type="warning"
        @click="ansQusetionDetails"
        style="padding: 11px"
        >回答问题详情</el-button
      >
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="60%">
      <el-form label-width="80px">
        <el-form-item label="题干">
          <el-input
            v-model="question"
            @click.native="questionThem"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="选项">
          <template v-for="(item, index) in showOptions">
            <el-form-item :label="item.options" :key="index">
              <el-input
                v-model="item.value"
                clearable
                placeholder="请输入"
                class="optionsSty"
                @click.native="optionsFn(index)"
                style="margin: 0px 0px 10px 0px"
              ></el-input>
            </el-form-item>
          </template>
        </el-form-item>
        <el-form-item label="标答">
          <template v-for="(item, index) in showOptions">
            <el-radio
              v-model="trueOptions"
              :label="item.options"
              :key="index"
              >{{ item.options }}</el-radio
            >
          </template>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitFn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  createPushUrl,
  randomName,
  addMessage,
  publishQuestion,
} from "@/api/teacher/";
import { Radio } from "element-ui";
export default {
  name: "liveUtil",
  components: {
    [Radio.name]: Radio,
  },
  data() {
    return {
      livePusher: null,
      pushUrl: "",
      dialogVisible: false,
      question: "",
      showOptions: [
        {
          options: "A",
          value: "",
        },
        {
          options: "B",
          value: "",
        },
        {
          options: "C",
          value: "",
        },
        {
          options: "D",
          value: "",
        },
      ],
      trueOptions: "",
      bizid: "",
      union: "",
    };
  },
  methods: {
    liveInit() {
      // 获取推流地址
      createPushUrl()
        .then((result) => {
          window.localStorage.setItem("a", result.data.bizid);
          this.bizid = result.data.bizid;
          this.pushUrl = result.data.address.replace("rtmp", "webrtc");
          this.livePusher = new TXLivePusher();
          this.startLive();
          return addMessage({
            content: this.bizid,
            courseId: this.$route.query.id,
            type: 5,
          });
        })
        .then((result) => {
          console.log("发布信息", result);
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
    optionsFn(index) {
      this.$myRichText({ oriHtml: this.showOptions[index].value })
        .then((result) => {
          this.showOptions[index].value = result;
        })
        .catch(() => {});
    },
    getRandomName() {
      randomName({ id: this.$route.query.id }).then((result) => {
        console.log(result);
        this.$confirm(
          `账号：${result.data.userName}，姓名：${result.data.name}`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(() => {})
          .catch(() => {});
      });
    },
    ansQusetionDetails() {
      if (this.union == "" && !window.localStorage.union) {
        this.$message.error("请先发布课堂问题");
        return;
      }
      this.$router.push({
        path: "/teacher/ansQuestion",
        query: {
          id: this.union == "" ? window.localStorage.union : this.union,
        },
      });
    },
    questionThem() {
      this.$myRichText({ oriHtml: this.question })
        .then((result) => {
          this.question = result;
        })
        .catch(() => {});
    },
    getTime() {
      let date = new Date();
      return date.getSeconds();
    },
    getUnion() {
      this.union = Date.now();
      window.localStorage.setItem("union", this.union);
      return this.union;
    },
    submitFn() {
      if (this.question.replace(/(^\s*)|(\s*$)/g, "") == "") {
        this.$message({
          message: "请输入题干",
          type: "warning",
        });
        return;
      }
      if (this.trueOptions == "") {
        this.$message({
          message: "请输入正确答案",
          type: "warning",
        });
        return;
      }
      for (let i = 0; i < this.showOptions.length; i++) {
        if (this.showOptions[i].value.replace(/(^\s*)|(\s*$)/g, "") == "") {
          this.$message({
            message: `请输入第${i + 1}选项的值`,
            type: "warning",
          });
          return;
        }
      }
      let obj = {
        question: JSON.stringify({
          topicInfo: this.question,
          optionsInfo: {
            ...this.showOptions,
          },
        }),
        params: {
          answer: this.trueOptions,
          time: this.getTime()+600,
          union: this.getUnion(),
        },
      };
      publishQuestion(obj)
        .then((result) => {
          console.log("发布问题", result);
          console.log(this.union);
          window.localStorage.union = this.union;
          this.dialogVisible = false;
          return addMessage({
            content: this.union,
            courseId: this.$route.query.id,
            type: 2,
          });
        })
        .then(() => {
          this.clearAll();
          this.$message({
            message: "发布完成",
            type: "success",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    clearAll() {
      this.trueOptions = "";
      this.question = "";
      this.showOptions = [
        {
          options: "A",
          value: "",
        },
        {
          options: "B",
          value: "",
        },
        {
          options: "C",
          value: "",
        },
        {
          options: "D",
          value: "",
        },
      ];
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