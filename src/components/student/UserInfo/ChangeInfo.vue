<template>
  <div class="mainBox">
    <div class="leftBox">
      <div class="headPortraitBox">
        <div class="headPortrait" :style="photo"></div>
        <div class="cover">
          <el-upload
            class="avatar-uploader"
            action=""
            :auto-upload="false"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-change="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <div class="unchangeableInfo">
        <div class="studentAccount">账号：{{ userInfo.userName }}</div>
        <div class="studentName">姓名：{{userInfo.name}}</div>
        <div class="studentClass">班级：{{ userInfo.gradeId }}</div>
        <div class="studentEmail">邮箱：{{ userInfo.email }}</div>
      </div>
    </div>
    <div class="rightBox">
      <div class="studentSex">
        性别：
        <el-radio v-model="sex" label="男">男</el-radio>
        <el-radio v-model="sex" label="女" style="margin-left: 20px"
          >女</el-radio
        >
      </div>
      <!-- <div class="major">
        专业：
        <el-select v-model="major" placeholder="major">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div> -->
      <div class="nativePlace">
        籍贯：
        <el-cascader
          v-model="userAddress"
          :props=addrssDate
          :options=addressOptions
          @change="handleChange"
          separator=""
          style="{height:200px.overflow:auto}"
        ></el-cascader>
      </div>
      <div class="btns">
        <el-button
          type="primary"
          size="medium"
          :style="{ width: '100px', height: '40px' }"
          @click="updateInfoFun"
          >修改</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import {
  getUserInfo,
  updatePhoto,
  updateInfo,
  getAllAddress,
} from "@/api/student/yxyAxios";
import { Radio, Select, Option, Button, Upload, Message,Cascader } from "element-ui";
export default {
  name: "ChangeInfo",
  data() {
    return {
      sex: "",
      addressOptions: [],
      userAddress:[],
      userInfo: "",
      photo: {
        backgroundImage: "",
      },
      imageUrl: "",
      fileList: [],
      addrssDate:{
        // emitPath: false, // 只返回该节点的值
        value: "addressName", // 自定义要映射的键名
        label: "addressName",
        children: "citys"
      }
    };
  },
  components: {
    [Radio.name]: Radio,
    [Select.name]: Select,
    [Option.name]: Option,
    [Button.name]: Button,
    [Upload.name]: Upload,
    [Cascader.name]:Cascader
  },
  methods: {
    getUserInfoFun() {
      getUserInfo().then((res) => {
        if (res.status == 200) {
          this.userInfo = res.data;
          this.sex = res.data.sex;
          this.userAddress= res.data.nativePlace.split('/');
          if(res.data.nativePlace!='无'){
            this.userAddress=res.data.nativePlace.split('/');
          }
          this.photo.backgroundImage = "url(" + res.data.photo + ")";
        } else {
          console.log("error");
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    /**
     * 修改头像
     */
    beforeAvatarUpload(file) {
      const isJPG = file.raw.type === "image/jpeg";
      const isLt2M = file.raw.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      let formData = new FormData();
      formData.append("photo", file.raw);
      updatePhoto(formData).then((res) => {
        if (res.status == 200) {
          Message.success("修改成功!");
          this.getUserInfoFun();
        }
      });
    },
    /**
     * 更新信息
     */
    updateInfoFun() {
      if(this.userAddress==undefined){
        Message.warning('请选择籍贯');
      }else{
        let data = {
        sex: this.sex,
        nativePlace:this.userAddress.join('/')
      };
      updateInfo(data).then((res) => {
        if (res.status == 200) {
          Message.success("修改成功!");
          this.getUserInfoFun();
        } else {
          Message.error("网络异常，修改失败");
        }
      });
      } 
    },
    /**
     * 获取籍贯
     */
    getAllAddressFun() {
      getAllAddress().then((res) => {
        console.log("籍贯：", res);
        console.log(this.addressOptions);
        if (res.status == 200) {
          let data=JSON.stringify(res.data.address.provinces).replace(/provinceName/g,"addressName");
          data=data.replace(/cityName/g,"addressName")
          this.addressOptions = JSON.parse(data);
          console.log(this.addressOptions);
        } else {
          Message.warning("网络异常，获取籍贯失败");
        }
      });
    },
     handleChange(value) {
      this.userAddress=value
        console.log(this.userAddress);
      }
  },
  mounted() {
    this.getUserInfoFun();
    this.getAllAddressFun();
  },
};
</script>

<style lang="less">
  .el-cascader-panel{
    height: 300px;
  }
</style>
<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
}

.mainBox {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 50px;
}
.headPortraitBox {
  position: relative;
  width: 80px;
  height: 80px;
  .headPortrait {
    width: 80px;
    height: 80px;
    border-radius: 80px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }
  .cover {
    display: inline-block;
    position: absolute;
    width: 80px;
    height: 80px;
    border-radius: 80px;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
    opacity: 0;
    transition: all 0.3s;
    i {
      display: inline-block;
      width: 30px;
      height: 30px;
      font-size: 25px;
      color: #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -15px;
      margin-top: -15px;
    }
    input {
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
  &:hover {
    .cover {
      opacity: 1;
    }
  }
}

.nativePlace {
  li {
    padding-left: 10px;
  }
}

.unchangeableInfo {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  div {
    margin: 10px 0;
    color: #666;
    font-size: 15px;
  }
}
.rightBox {
  margin-left: 100px;
  .studentSex {
    margin-top: 20px;
  }
  .nativePlace {
    margin: 50px 0;
  }
}

.btns {
  margin-top: 40px;
  button {
    float: right;
  }
}

// .avatar-uploader .el-upload {
//   border: 1px dashed #d9d9d9;
//   border-radius: 6px;
//   cursor: pointer;
//   position: relative;
//   overflow: hidden;
// }
// .avatar-uploader .el-upload:hover {
//   border-color: #409eff;
// }
// .avatar-uploader-icon {
//   font-size: 28px;
//   color: #8c939d;
//   width: 178px;
//   height: 178px;
//   line-height: 178px;
//   text-align: center;
// }
// .avatar {
//   width: 178px;
//   height: 178px;
//   display: block;
// }
</style>