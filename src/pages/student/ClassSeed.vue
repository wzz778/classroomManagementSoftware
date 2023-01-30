<template>
  <div>
    <!-- banner -->
    <div class="message-banner">
      <!-- 弹幕输入框 -->
      <div class="message-container">
        <h1 class="message-title">留言板</h1>
        <div class="animated fadeInUp message-input-wrapper">
          <input
            v-model="messageContent"
            @click="show = true"
            placeholder="说点什么吧"
            style="background: transparent"
          />
          <button
            class="ml-3 animated bounceInLeft"
            @click="addToList"
            v-show="show"
          >
            发送
          </button>
        </div>
      </div>
      <!-- 弹幕列表 -->
      <div class="barrages-drop">
        <vue-baberrage
          :isShow="barrageIsShow"
          :barrageList="barrageList"
          :maxWordCount="maxWordCount"
          :throttleGap="throttleGap"
          :loop="barrageLoop"
          :boxHeight="boxHeight"
          :messageHeight="messageHeight"
        >
        </vue-baberrage>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { vueBaberrage, MESSAGE_TYPE } from "vue-baberrage";

Vue.use(vueBaberrage);

export default {
  name: "ClassSeed",
  data() {
    return {
      msg: "1111111111",
      barrageIsShow: true,
      messageHeight: 3,
      boxHeight: 150,
      barrageLoop: true,
      maxWordCount: 3,
      throttleGap: 5000,
      barrageList: [],
    };
  },
  mounted() {
    this.addToList();
  },
  methods: {
    addToList() {
      let list = [
        {
          id: 1,
          avatar:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg",
          msg: this.msg,
          time: 13,
          barrageStyle: "red",
        },
        {
          id: 2,
          avatar:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg",
          msg: this.msg,
          time: 18,
          barrageStyle: "green",
        },
        {
          id: 3,
          avatar:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg",
          msg: this.msg,
          time: 10,
          barrageStyle: "normal",
        },
        {
          id: 4,
          avatar:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg",
          msg: this.msg,
          time: 15,
          barrageStyle: "blue",
        },
        {
          id: 5,
          avatar:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg",
          msg: this.msg,
          time: 16,
          barrageStyle: "red",
        },
        {
          id: 6,
          avatar:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg",
          msg: this.msg,
          time: 12,
          barrageStyle: "normal",
        },
        {
          id: 7,
          avatar:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg",
          msg: this.msg,
          time: 15,
          barrageStyle: "red",
        },
        {
          id: 8,
          avatar:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg",
          msg: this.msg,
          time: 10,
          barrageStyle: "normal",
        },
        {
          id: 9,
          avatar:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg",
          msg: this.msg,
          time: 10,
          barrageStyle: "red",
        },
        {
          id: 10,
          avatar:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg",
          msg: this.msg,
          time: 10,
          barrageStyle: "yellow",
        },
      ];
      list.forEach((v) => {
        this.barrageList.push({
          id: v.id,
          avatar: v.avatar,
          msg: v.msg,
          time: v.time,
          type: MESSAGE_TYPE.NORMAL,
          barrageStyle: v.barrageStyle,
        });
      });
    },
  },
};
</script>
<style  lang="less">
.message-banner {
  position: absolute;
  /*top: -58px;*/
  left: 0;
  right: 0;
  height: 100vh;
  background: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606901653454&di=8da42ee1bb5a8f94eb9bd9f6b2a9b968&imgtype=0&src=http%3A%2F%2Fwww.deskcar.com%2Fdesktop%2Felse%2F201272223323%2F5.jpg)
    center center / cover no-repeat;
  background-color: #49b1f5;
  animation: header-effect 1s;
}
.message-title {
  color: #eee;
  animation: title-scale 1s;
}
.message-container {
  position: absolute;
  width: 360px;
  top: 35%;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 5;
  margin: 0 auto;
  color: #fff;
}
.message-input-wrapper {
  display: flex;
  justify-content: center;
  height: 2.5rem;
  margin-top: 2rem;
}
.message-input-wrapper input {
  outline: none;
  width: 70%;
  border-radius: 20px;
  height: 100%;
  padding: 0 1.25rem;
  color: #eee;
  border: #fff 1px solid;
}
.message-input-wrapper input::-webkit-input-placeholder {
  color: #eeee;
}
.message-input-wrapper button {
  outline: none;
  border-radius: 20px;
  height: 100%;
  padding: 0 1.25rem;
  border: #fff 1px solid;
}
.barrages-drop {
  .blue {
    border-radius: 100px;
    background: #e6ff75;
    color: #fff;
  }

  .green {
    border-radius: 100px;
    background: #75ffcd;
    color: #fff;
  }
  .red {
    border-radius: 100px;
    background: #e68fba;
    color: #fff;
  }
  .yellow {
    border-radius: 100px;
    background: #dfc795;
    color: #fff;
  }
  .baberrage-stage {
    position: absolute;
    width: 100%;
    z-index: 10;
    height: 170px;
    overflow: hidden;
    top: 0;
  }
}
</style>

