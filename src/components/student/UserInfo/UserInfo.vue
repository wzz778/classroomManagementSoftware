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
        <ForgetPassword></ForgetPassword>
      </el-tab-pane>
      <el-tab-pane label="注销账号">
        <AccountCancellation></AccountCancellation>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { Tabs, TabPane } from "element-ui";
import ChangeInfo from '@/components/student/UserInfo/ChangeInfo'
import ForgetPassword from '@/components/student/UserInfo/ForgetPassword'
// import ChangePassword from '@/components/student/UserInfo/ChangePassword'
import AccountCancellation from '@/components/student/UserInfo/AccountCancellation'
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
    ForgetPassword,
    // ChangePassword,
    AccountCancellation
  },
  mounted(){
    console.log("tokentoken:",this.$store.state.token);
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
  width: 1200px;
  height: 100vh;
  left: 50%;
  margin-left: -600px;
  height: 100vh;
}
textarea{
  min-height: 80px !important;
}
</style>