<template>
  <el-button
    type="primary"
    :disabled="isDisabled"
    size="mini"
    plain
    @click="getCodeFun"
    >{{ btnText }}</el-button
  >
</template>

<script>
import { Button, Message } from "element-ui";
import { getCode } from "@/api/student/yxyAxios";
export default {
  name: "GetCode",
  data() {
    return {
      time: "",
      countDown: null,
      btnText: "获取验证码",
      isDisabled: "",
    };
  },
  props: ["email", "judgeEmailRes"],
  components: {
    [Button.name]: Button,
  },
  methods: {
    getCodeFun() {
      if (this.email == "") {
        Message.warning("请填写邮箱！");
      } else if (this.judgeEmailRes == false) {
        Message.warning("邮箱格式不合规范，请重新填写！");
      } else {
        let data = {
          email: this.email,
        };
        this.isDisabled = true;
        getCode(data).then((res) => {
          if (res.status == 200) {
            Message.success("获取成功！");
            this.countDownFun();
          } else {
            this.isDisabled = false;
            Message.error("网络异常，发送失败！");
          }
        });
      }
    },
    countDownFun() {
      this.countDown = setInterval(() => {
        if (this.time <= 0) {
          clearInterval(this.countDown);
          sessionStorage.removeItem("countDownTime");
          this.btnText = "获取验证码";
          this.time = 60;
          this.isDisabled = false;
        } else {
          this.time--;
          sessionStorage.setItem("countDownTime", this.time);
          this.btnText = `${this.time}秒后可获取`;
        }
      }, 1000);
    },
  },
  mounted() {
    sessionStorage.setItem("email", this.email);
    this.time = sessionStorage.getItem("countDownTime") || 60;
    this.isDisabled = false;
    if (this.time < 60) {
      this.countDownFun();
      this.isDisabled = true;
    }
  },
};
</script>

<style>
</style>