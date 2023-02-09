<template>
  <div class="sign">
    <div class="signTop">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          ><span @click="changeFatherData">返回</span></el-breadcrumb-item
        >
        <el-breadcrumb-item>课程任务</el-breadcrumb-item>
        <el-breadcrumb-item>签到</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="signTitle">
      <div class="name">
        <img :src="ada ? ada : require('@/assets/yxy/classPic.jpg')" />
      </div>
      <div class="name">
        <p style="margin-top: 12px">签到</p>
        <p class="nameTime">
          {{ time }}
          <span
            ><i
              class="el-icon-timer"
              style="font-size: 16px; margin-right: 6px"
            ></i
            >{{ this.meet }}</span
          >
        </p>
      </div>
    </div>
    <div class="signMain">
      <div class="bdetailed" v-show="meet == '签到未开始'">
        <div class="wbegin">
          <div>
            <i
              class="el-icon-message-solid"
              style="
                font-size: 60px;
                margin-right: 6px;
                color: rgb(24 103 210);
                font-weight: bolder;
              "
            ></i>
          </div>
          <div style="margin-top: 15px">签到未开始</div>
          <div>开始时间:{{ time }}</div>
        </div>
      </div>
      <div class="detailed" v-show="meet == '签到中'">
        <div class="she" v-show="adatar == '未签到'">
          <div @click="postChange">
            <i
              class="el-icon-timer"
              style="
                font-size: 60px;
                margin-right: 6px;
                color: #d29918;
                font-weight: bolder;
              "
            ></i>
          </div>
          <div style="margin-top: 15px">尚未签到</div>
          <div>当前时间：{{ endtime }}</div>
        </div>
        <div class="endq" v-show="adatar == '已签到'">
          <div>
            <i
              class="el-icon-success"
              style="
                font-size: 60px;
                margin-right: 6px;
                color: rgb(24 103 210);
                font-weight: bolder;
              "
            ></i>
          </div>
          <div style="margin-top: 15px">按时签到</div>
          <div>当前时间：{{ endtime }}</div>
        </div>
      </div>
      <div class="edetailed" v-show="meet == '签到结束'">
        <div class="wend">
          <div>
            <i
              class="el-icon-close-notification"
              style="
                font-size: 60px;
                margin-right: 6px;
                color: rgb(24 103 210);
                font-weight: bolder;
              "
            ></i>
          </div>
          <div style="margin-top: 15px">签到已结束</div>
          <div>当前时间：{{ endtime }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Zsign, ZwhetherSign } from "@/api/user/index";
import { Breadcrumb, BreadcrumbItem } from "element-ui";
export default {
  name: "SignIn",
  props: {
    check: String,
  },
  data() {
    return {
      ada: "",
      adatar: "未签到",
      meet: this.check,
      text: "我是子组件传递的数据，我要发送给父组件",
      jiao: "任务",
      sid: this.$route.query.id,
      singid: "",
      time: "",
      endtime: "",
    };
  },
  mounted: function () {
    // this.just();
  },
  methods: {
    getDate() {
      const date = new Date();
      var year = date.getFullYear();
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
       * */
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      // 拼接
      return year + "-" + month + "-" + day + " " + hours + ":" + minutes;
    },
    //改变签到状态
    postChange() {
      let data = {
        courseId: this.sid,
        signId: this.singid,
      };
      Zsign(data).then((result) => {
        if (result.msg == "OK") {
          this.adatar = "已签到";
          this.$message({
            type: "success",
            message: "签到成功",
          });
        } else if (result.msg == "签到时间已过") {
          this.$message({
            type: "success",
            message: "签到时间已过",
          });
        } else {
          this.$message.error("签到失败");
        }
      });
    },
    changeFatherData() {
      this.$emit("changeMsg", this.text, this.jiao);
    },
    //进入签到页面判断签到状态
    just(value, time) {
      this.singid = value;
      this.endtime = time;
      let data = {
        courseId: this.sid,
      };
      ZwhetherSign(data).then((result) => {
        if (result.data == "已签到") {
          this.adatar = "已签到";
        } else {
          this.adatar = "未签到";
        }
      });
    },
    //进入签到页面赋值截至时间
    jtime(value) {
      this.endtime = value;
    },
    jsta(value) {
      this.time = value;
    },
  },
  components: {
    [Breadcrumb.name]: Breadcrumb,
    [BreadcrumbItem.name]: BreadcrumbItem,
  },
  watch: {
    check(val) {
      //当a值变化时
      this.meet = this.check;
    },
  },
};
</script>

<style lang="less" scoped>
.sign {
  width: 1000px;
  min-height: 450px;
  margin-bottom: 50px;
  border-radius: 8px;
  margin: 0 auto;
  padding-bottom: 20px;
  .signTop {
    height: 35px;
    line-height: 35px;
  }
  .signTitle {
    height: 90px;
    line-height: 90px;
    padding-left: 2em;
    border-radius: 6px;
    background: white;
    display: flex;
  }
  .signMain {
    width: 100%;
    height: 340px;
    line-height: 340px;
    margin-top: 15px;
    padding-top: 70px;
    border-radius: 6px;
    background: white;
  }
}
.name {
  height: 90px;
  line-height: 90px;
  p {
    height: 30px;
    line-height: 30px;
  }
}
img {
  width: 50px;
  height: 50px;
  margin: 20px 15px 20px 0px;
}
.nameTime {
  font-size: 13px;
  color: #aaa9a7;
  span {
    margin-left: 30px;
  }
}
.detailed {
  position: relative;
  width: 500px;
  height: 200px;
  margin: 0 auto;
  text-align: center;
}
.bdetailed {
  position: relative;
  width: 500px;
  height: 200px;
  margin: 0 auto;
  text-align: center;
}
.edetailed {
  position: relative;
  width: 500px;
  height: 200px;
  margin: 0 auto;
  text-align: center;
}
.she {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  div {
    height: 40px;
    line-height: 40px;
  }
}
.endq {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  div {
    height: 40px;
    line-height: 40px;
  }
}
.wbegin {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  div {
    height: 40px;
    line-height: 40px;
  }
}
.wend {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  div {
    height: 40px;
    line-height: 40px;
  }
}
i:hover {
  cursor: pointer;
}
span:hover {
  cursor: pointer;
}
</style>