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
        <div class="studentName">姓名：{{ userInfo.userName }}</div>
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
      <div class="major">
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
      </div>
      <div class="nativePlace">
        籍贯：
        <el-select v-model="province" placeholder="province">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select style="margin-left: 20px" v-model="city" placeholder="city">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="btns">
        <el-button
          type="primary"
          plain
          size="medium"
          :style="{ width: '70px', height: '30px' }"
          >修改</el-button
        >
        <el-button
          type="danger"
          plain
          size="medium"
          :style="{ width: '70px', height: '30px' }"
          >取消</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo, updatePhoto } from "@/api/student/yxyAxios";
import { Radio, Select, Option, Button, Upload } from "element-ui";
export default {
  name: "ChangeInfo",
  data() {
    return {
      sex: "男",
      options: [
        {
          value: "北京",
          label: "北京",
        },
        {
          value: "上海",
          label: "上海",
        },
        {
          value: "天津",
          label: "天津",
        },
        {
          value: "深圳",
          label: "深圳",
        },
        {
          value: "河南",
          label: "河南",
        },
      ],
      province: "河南省",
      city: "许昌市",
      major: "",
      userInfo: "",
      photo: {
        backgroundImage: "",
      },
      imageUrl: "",
      fileList: [],
    };
  },
  components: {
    [Radio.name]: Radio,
    [Select.name]: Select,
    [Option.name]: Option,
    [Button.name]: Button,
    [Upload.name]: Upload,
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
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
      console.log(file);
      updatePhoto(formData).then((res) => {
        console.log(res);
      });
    },
    updatePhoto() {
      console.log();
    },
    // photoFile(e) {
    //   console.log(e.target.value);
    //   let data = {
    //     photo: e.target.value,
    //   };
    //   updatePhoto(data).then((res) => {
    //     console.log(res);
    //   });
    // },
  },
  mounted() {
    getUserInfo().then((res) => {
      if (res.status == 200) {
        console.log(res);
        this.userInfo = res.data;
        this.sex = res.data.sex;
        this.major = res.data.major;
        this.photo.backgroundImage = "url(" + res.data.photo + ")";
      } else {
        console.log("error");
      }
    });
  },
};
</script>

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
  .major {
    margin: 50px 0;
  }
}

.btns {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>