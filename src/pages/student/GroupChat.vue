<template>
  <div class="mainBox">
    <div class="chatArea">
      <div class="msgViewArea" id="msgViewArea" @scroll="scrollLoadMore">
        <div v-for="(info, index) in chatInfo" :key="index">
          <div
            class="othersMsgBox"
            v-if="info.userInfo.studentId != userInfo.studentId"
            :id="index == dataInfoNum ? 'first' : 'normal'"
          >
            <div
              class="otherHeadPic"
              :style="{
                backgroundImage: `url(${info.userInfo.photo})`,
              }"
            ></div>
            <div class="msgBox">
              <div class="othersName">{{ info.userInfo.name }}</div>
              <div class="othersMsg" v-html="info.text"></div>
            </div>
          </div>
          <div
            class="myMsgBox"
            v-else-if="info.userInfo.studentId == userInfo.studentId"
            :id="index == dataInfoNum ? 'first' : 'normal'"
          >
            <div
              class="myHeadPic"
              :style="{
                backgroundImage: `url(${info.userInfo.photo})`,
              }"
            ></div>
            <div class="myMsg" v-html="info.text"></div>
          </div>
        </div>
      </div>
      <div class="sendWords">
        <el-button type="success" plain class="sendBtn" @click="sendChat"
          >发送</el-button
        >
        <div class="editor" style="flex:1">
          <div ref="editor" class="textNeirong"></div>
        </div>
        <!-- <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入内容"
          v-model="words"
          maxlength="10"
          show-word-limit
        >
        </el-input> -->
      </div>
    </div>
    <div class="viewGroupInfo">
      <h3 class="groupName">{{ groupName }}</h3>
      <div class="groupMembers">
        <div class="memberNum">小组成员（{{ members.length }}）</div>
        <ul class="memberItems">
          <li class="memberItem" v-for="(m, index) in members" :key="index" style="width:90%;margin-left:5%;border-bottom:1px solid rgb(153 153 153 / 27%)">
            <!-- <div
              class="memberHeadPic"
              :style="{ backgroundImage: `url(${m.photo})` }"
            ></div> -->
            <span style="margin-left: 10px">{{ m.name }}</span>
            <!-- <span>({{m.userName}})</span> -->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script >
import E from "wangeditor";
import AlertMenu from "@/myText/myRichText"; // 根据AlertMenu.js文件实际路径进行引入即可
// import { Input,Button } from "element-ui";
import store from "@/store/";
import { Input, Button, Message } from "element-ui";
import {
  getMembers,
  sendMessage,
  getUserInfo,
  getHistoryChat,
} from "@/api/student/yxyAxios";
import jwt_decode from "jwt-decode";

export default {
  name: "GroupChat",
  data() {
    return {
      editor: null,

      chatText: null,

      token: "",
      userInfo: "",
      value: null,
      isClear: false,
      chatInfo: [],
      members: "",
      groupName: "",
      groupId: "",
      sever: "ws://110.40.205.103:8577/webSocket/",
      socket: null,
      haveGroup: false,
      nodePage: 1,
      pageSize:15,
      pages: 1,
      isNewInfo:false,
      wsInfo:0,
      dataInfoNum:0
    };
  },
  model: {
    prop: "value",

    event: "change",
  },
  components: {
    [Input.name]: Input,
    [Button.name]: Button,
  },
  watch: {
    isClear(val) {
      // 触发清除文本域内容

      if (val) {
        this.editor.txt.clear();

        this.chatText = null;
      }
    },

    value(value) {
      if (value !== this.editor.txt.html()) {
        this.editor.txt.html(this.value);
      }
    },
  },

  created() {
    this.token = "Bearer " + store.getters.access_token;
    this.initWebsocket();
  },

  mounted() {
    this.seteditor();
    this.editor.txt.html(this.value);
    this.getUserInfoFun();
  },
  updated() {
    if(this.isNewInfo==false){
      document
        .querySelector(".msgViewArea")
        .querySelector('#first').scrollIntoView(false);
    }
    if ((this.chatInfo.length != 0&&this.isNewInfo==true&&this.nodePage!=this.pageSize)) {
      document
        .querySelector(".msgViewArea")
        .lastElementChild.scrollIntoView(false);
    }
  },
  methods: {
    /**滚动事件 */
    scrollLoadMore() {
      if (document.querySelector("#msgViewArea").scrollTop <= 0) {
        if (this.nodePage == this.pages) {
          Message.warning("已获取全部历史消息");
        } else {
          // this.nodePage++;
          if(this.wsInfo%this.pageSize==0){
            this.nodePage+=this.wsInfo%this.pageSize+1;
          }else{
            this.nodePage+=Math.ceil(this.wsInfo/this.pageSize)
          }
          this.getHistoryChatFun(this.nodePage,this.wsInfo%this.pageSize);
        }
      }
    },
    getUserInfoFun() {
      getUserInfo()
        .then((res) => {
          if (res.status == 200) {
            this.userInfo = res.data.user;
          } else {
            Message.error("网络异常，获取用户信息失败！");
          }
        })
        .catch((err) => {
          // console.log(err);
          Message.error("网络异常，获取用户信息失败！");
        });
    },
    toTopic(idName) {
      document.querySelector(idName).scrollIntoView(true);
    },
    // getMembersFun() {
    //   let data = {
    //     courseId: this.$route.query.id,
    //   };
    //   getMembers(data).then((res) => {
    //     Object.keys(res.data).forEach((key) => {
    //       console.log(res.data[key]); // foo
    //       for (let i = 0; i < res.data[key].length; i++) {
    //         if (
    //           res.data[key][i].userName ==
    //           jwt_decode(this.$store.state.token).username
    //         ) {
    //           this.members = res.data[key];
    //           this.groupName = key.substr(5);
    //           this.sever += this.$route.query.id + key;
    //           console.log(this.sever);
    //         }
    //       }
    //     });
    //   });
    // },
    seteditor() {
      this.editor = new E(this.$refs.editor);
      this.editor.config.menus = [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "list", // 列表
        "justify", // 对齐方式
        "quote", // 引用
        "emoticon", // 表情
        "image", // 插入图片
        // "table", // 表格
        "code", // 插入代码
        "undo", // 撤销
        "redo", // 重复
      ];
      // 配置自定义按钮
      this.editor.menus.extend("alertMenu", AlertMenu); // 配置扩展的菜单
      this.editor.config.menus = this.editor.config.menus.concat("alertMenu");
      this.editor.config.onchange = (html) => {
        // console.log(html);
        this.chatText = html; // 绑定当前逐渐地值
      };
 // 配置上传图片
      this.editor.config.uploadImgShowBase64 = true; // base 64 存储图片
      this.editor.config.uploadImgServer = "/api/homework/addPicture";
      // 配置服务器端地址(这里的this.$api.getJavaEndPoint()是自己定义的一个地址前缀)
      this.editor.config.uploadFileName = "file"; // 后端接受上传文件的参数名
      this.editor.config.uploadImgHeaders = {
        token: store.state.token, // 设置请求头
      };
      this.editor.config.uploadImgHooks = {
        fail: function () {
          this.$message({
            message: "图片上传失败",
            type: "warning",
          });
        },
        error: function () {
          this.$message.error("图片上传出错");
        },
        success: (xhr, editor, result) => {
          // 图片上传成功回调
          console.log("成功", result);
        },
        customInsert: (insertImg, result, editor) => {
          insertImg(result.data);
        },
      };
      // 创建富文本编辑器

      this.editor.create();
    },
    // 销毁
    destruction() {
      //   console.log("是否销毁呢");
      this.editor.destroy(true);
      this.editor = null;
      //   销毁实例
      this.dialogVisible = false;
      this.promiseResult.resject(this.orlHtml);
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    /**
     * 发送
     */
    sendChat() {
      // console.log(this.chatText);
      if (this.haveGroup == false) {
        Message.warning("该课程还没有分组");
      } else {
        let content = {
          userInfo: JSON.stringify(this.userInfo),
          text: this.chatText,
        };
        let data = {
          content: JSON.stringify(content),
          courseId: this.$route.query.id,
          groupId: this.groupId,
        };
        this.sendMessageFun(data);
        this.editor.txt.clear();
      }
    },

    /**
     * 初始化websocket
     */
    initWebsocket() {
      let data = {
        courseId: this.$route.query.id,
      };
      getMembers(data).then((res) => {
        if (res.status == 200) {
          this.haveGroup = true;
          Object.keys(res.data).forEach((key,index) => {
            for (let i = 0; i < res.data[key].length; i++) {
              if (
                res.data[key][i].userName ==
                jwt_decode(this.$store.state.token).username
              ) {
                this.members = res.data[key];
                this.groupName = "第" +(index*1+1)+ "组";
                this.groupId = key;
                this.sever += this.$route.query.id + key;
                // ReconnectingWebSocket是类库reconnecting-websocket , 可以进行自动的断线重连,引入连接 :
                // let socket=new ReconnectingWebSocket(this.sever)
                let socket = new WebSocket(this.sever);
                this.socket = socket;
                this.socket.onmessage = this.OnMessage;
                this.socket.onopen = this.OnOpen;
                this.socket.onerror = this.OnError;
                this.socket.onclose = this.OnClose;
                this.getHistoryChatFun(1,0);
              }
            }
          });
        } else {
          this.groupName = "暂无分组";
          Message.warning("该课程暂无分组");
        }
      });
    },
    OnOpen() {
      console.log("连接成功");
    },
    OnError() {
      console.log("WebSocket连接失败");
    },
    OnClose() {
      console.log("WebSocket连接关闭");
    },
    OnMessage(e) {
      let info = JSON.parse(e.data);
      info.userInfo = JSON.parse(info.userInfo);
      this.chatInfo.push(info);
      this.wsInfo++;
      this.isNewInfo=true;
    },

    /**
     * 发送消息
     */
    sendMessageFun(data) {
      sendMessage(data).then((res) => {
        if(res.status==200){
          this.isNewInfo=true;
        }
      }).catch(err=>{
        console.log(err);
        Message.error("发送失败！,请重试");
      });
    },
    /**
     * 获取历史消息
     */
    getHistoryChatFun(page,sliceNum) {
      if(page==1){
        this.isNewInfo=true;
      }else{
        this.isNewInfo=false;
      }
      let data = {
        courseId: this.$route.query.id,
        groupId: this.groupId,
        nodePage: page,
        pageSize: this.pageSize,
      };
      getHistoryChat(data).then((res) => {
        this.pages = res.data.pages;
        res.records=res.data.records.slice(sliceNum-1);
        this.dataInfoNum=res.data.records.length;
        for (let i = 0; i < res.data.records.length; i++) {
          res.data.records[i].content = JSON.parse(res.data.records[i].content);
          res.data.records[i].content.userInfo = JSON.parse(
            res.data.records[i].content.userInfo
          );
          this.chatInfo.unshift(res.data.records[i].content);
        }
      });
    },
  },
  beforeDestroy() {
    this.OnClose();
  },
};
</script>

<style lang="less" scope>
* {
  padding: 0;
  margin: 0;
}

.mainBox {
  display: flex;
  height: 100%;
  justify-content: space-between;
  // overflow: auto;
}

.msgViewArea {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 75%;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 10px;
  overflow: auto;
  scroll-behavior: smooth;
  .othersMsgBox {
    display: flex;
    width: 100%;
    float: left;
    .otherHeadPic {
      display: inline-block;
      width: 35px;
      height: 35px;
      border-radius: 35px;
      background-image: url(@/assets/yxy/userProfile.webp);
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      margin-left: 10px;
    }
    .msgBox {
      display: flex;
      flex-direction: column;
      margin-left: 10px;
    }
    .othersName {
      height: 30px;
      line-height: 30px;
      color: #666;
      font-size: 14px;
      text-align: left;
    }
    .othersMsg {
      line-height: 30px;
      padding: 5px 10px;
      background-color: cornflowerblue;
      color: #fff;
      border-radius: 0 5px 5px 5px;
      text-align: left;
    }
  }
  .myMsgBox {
    display: block;
    width: 100%;
    .myHeadPic {
      display: inline-block;
      width: 35px;
      height: 35px;
      border-radius: 35px;
      background-image: url(@/assets/yxy/userProfile.webp);
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      margin-right: 10px;
      float: right;
    }
    .myMsg {
      line-height: 30px;
      padding: 5px 10px;
      background-color: cornflowerblue;
      color: #fff;
      border-radius: 5px 0 5px 5px;
      float: right;
      margin-top: 30px;
      max-width: 400px;
      text-align: left;
    }
  }
}
.viewGroupInfo {
  width: 200px;
  background-color: #fff;
  border: 1px solid #fff;
  border-radius: 5px;
}

.chatArea {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 94%;
  height: 100%;
  margin-right: 3%;
  flex: 1;
}
.sendWords {
  width: 100%;
  height: 25%;
  margin-bottom: 50px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .sendBtn {
    width: 80px;
    height: 36px;
    z-index: 1000;
  }
}
#wordsInput {
  width: 100%;
  textarea {
    height: 100%;
  }
}

.el-textarea {
  position: relative;
  span {
    display: inline-block;
    line-height: 30px;
  }
}

.viewGroupInfo {
  display: flex;
  flex-direction: column;
  height: 500px;
  margin-top: 30px;
}
.groupName {
  height: 50px;
  color: #666;
  line-height: 50px;
  text-align: center;
}

.groupMembers {
  flex: 1;
  .memberNum {
    width: 90%;
    height: 30px;
    margin-left: 5%;
    line-height: 30px;
    text-align: left;
  }
}

.memberItems {
  height: 400px;
  overflow: auto;
  li {
    display: flex;
    align-items: center;
    height: 60px;
    line-height: 60px;
    .memberHeadPic {
      display: inline-block;
      width: 35px;
      height: 35px;
      border-radius: 35px;
      background-image: url(@/assets/yxy/userProfile.webp);
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      margin-left: 10px;
    }
    span {
      display: inline-block;
      height: 35px;
      line-height: 35px;
      color: #666;
      font-size: 14px;
    }
  }
}

/* 整个滚动条 */
::-webkit-scrollbar {
  /* 对应纵向滚动条的宽度 */
  width: 4px;
  /* 对应横向滚动条的宽度 */
  height: 4px;
}

/* 滚动条上的滚动滑块 */
::-webkit-scrollbar-thumb {
  background-color: #49b1f5;
  border-radius: 10px;
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
  background-color: #dbeffd;
  border-radius: 32px;
}

.editor {
  width: 100%;

  margin: auto;

  position: relative;
  z-index: 99;
}
</style>