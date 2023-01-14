<template>
  <div class="mainBox">
    <div class="leftBox">
      <div class="headPortraitBox">
        <div class="headPortrait"></div>
        <input type="file" />
      </div>
      <div class="unchangeableInfo">
        <div class="studentName">姓名：MOON</div>
        <div class="studentClass">班级：计科211</div>
        <div class="studentEmail">邮箱：3190493163@qq.com</div>
      </div>
    </div>
    <div class="rightBox">
      <div class="studentSex">
        性别：
        <el-radio v-model="sex" label="男">男</el-radio>
        <el-radio v-model="sex" label="女">女</el-radio>
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
        <el-select v-model="city" placeholder="city">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script>
import { Radio, Select, Option } from "element-ui";
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
      major: "计算机科学与技术",
    };
  },
  components: {
    [Radio.name]: Radio,
    [Select.name]: Select,
    [Option.name]: Option,
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
  width: 100%;
}
.headPortraitBox {
    position: relative;
    width: 70px;
    height: 70px;
    .headPortrait{
        position: absolute;
        width: 70px;
        height: 70px;
        border-radius: 70px;
        background-image: url(@/assets/yxy/userProfile.jpg);
    }
}

.nativePlace {
  li {
    padding-left: 10px;
  }
}
</style>