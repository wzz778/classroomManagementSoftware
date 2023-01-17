<template>
  <div class="mainBox">
    <div class="chatArea">
      <div class="msgViewArea">
        <div class="othersMsgBox">
          <div class="otherHeadPic"></div>
          <div class="msgBox">
            <div class="othersName">成员</div>
            <div class="othersMsg">你好</div>
          </div>
        </div>
        <div class="myMsgBox">
          <div class="myHeadPic"></div>
          <div class="myMsg">你好,这是一段话，你好,这是一段话你好,这是一段话你好,这是一段话你好,这是一段话你好,这是一段话你好,这是一段话你好,这是一段话</div>
        </div>
        <div class="myMsgBox">
          <div class="myHeadPic"></div>
          <div class="myMsg">你好</div>
        </div>
        <div class="myMsgBox">
          <div class="myHeadPic"></div>
          <div class="myMsg">你好</div>
        </div>
      </div>
      <div class="sendWords">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入内容"
          v-model="words"
          maxlength="10"
          show-word-limit
        >
        </el-input>
        <button plain class="sendBtn">发送</button>
      </div>
    </div>
    <div class="viewGroupInfo">
      <h3 class="groupName">第1组</h3>
      <div class="groupMembers">
        <div class="memberNum">小组成员（5）</div>
        <ul class="memberItems">
          <li class="memberItem">
            <div class="memberHeadPic"></div>
            <span style="margin-left: 10px">成员</span>
            <span>(计科211)</span>
          </li>
          <li class="memberItem">
            <div class="memberHeadPic"></div>
            <span style="margin-left: 10px">成员</span>
            <span>(计科211)</span>
          </li>
          <li class="memberItem">
            <div class="memberHeadPic"></div>
            <span style="margin-left: 10px">成员</span>
            <span>(计科211)</span>
          </li>
          <li class="memberItem">
            <div class="memberHeadPic"></div>
            <span style="margin-left: 10px">成员</span>
            <span>(计科211)</span>
          </li>
          <li class="memberItem">
            <div class="memberHeadPic"></div>
            <span style="margin-left: 10px">成员</span>
            <span>(计科211)</span>
          </li>
          <li class="memberItem">
            <div class="memberHeadPic"></div>
            <span style="margin-left: 10px">成员</span>
            <span>(计科211)</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script >
// import { Input,Button } from "element-ui";
import { Input, Button } from "element-ui";
export default {
  name: "GroupChat",
  data() {
    return {
      words: "",
    };
  },
  components: {
    [Input.name]: Input,
    [Button.name]: Button,
  },
};
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
}

.mainBox {
  display: flex;
  height: 100%;
  justify-content: space-between;
  overflow: auto;
}

.msgViewArea {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 75%;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 10px;
  .othersMsgBox {
    display: flex;
    width: 100%;
    float: left;
    .otherHeadPic {
      display: inline-block;
      width: 35px;
      height: 35px;
      border-radius: 35px;
      background-image: url(@/assets/yxy/userProfile.jpg);
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
      background-image: url(@/assets/yxy/userProfile.jpg);
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
  height: auto;
  margin-bottom: 50px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .sendBtn {
    display: inline-block;
    width: 60px;
    height: 30px;
    text-align: center;
    margin-top: 10px;
    border: 1px solid #b3d8ff;
    background-color: #ecf5ff;
    color: #409eff;
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      background-color: cornflowerblue;
      color: #ecf5ff;
    }
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
      background-image: url(@/assets/yxy/userProfile.jpg);
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
</style>