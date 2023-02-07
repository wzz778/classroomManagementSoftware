<template>
  <div class="allPage_userInfo">
    <el-tabs :tab-position="tabPosition" style="height: 200px">
      <el-tab-pane label="基本信息">
        <ChangeInfo></ChangeInfo>
      </el-tab-pane>
      <!-- <el-tab-pane  label="修改密码">
        <ChangePassword></ChangePassword>
      </el-tab-pane> -->
      <el-tab-pane label="修改密码">
        <ChangePassword></ChangePassword>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { Tabs, TabPane } from "element-ui";
import ChangeInfo from '@/components/student/UserInfo/ChangeInfo'
// import ForgetPassword from '@/components/student/UserInfo/ForgetPassword'
import ChangePassword from '@/components/student/UserInfo/ChangePassword'
export default {
  name: "UserInfo",
  data() {
    return {
      tabPosition: "top",
    };
  },
  components: {
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    ChangeInfo,
    // ForgetPassword,
    ChangePassword,
  },
  mounted(){
    // console.log("tokentoken:",this.$store.state.token);
  }
  
};
</script>

<style lang="less">
// .el-tabs__content{
//     display: none;
// }
.allPage_userInfo{
  display: inline-block;
  position: relative;
  width: 100%;
  height: 100%;
}
textarea{
  min-height: 80px !important;
}
</style>