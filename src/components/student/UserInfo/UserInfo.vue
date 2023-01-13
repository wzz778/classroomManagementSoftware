<template>
  <div class="mainBox">
    <el-tabs :tab-position="tabPosition" style="height: 200px">
      <el-tab-pane slot="basicInformation" label="基本信息"></el-tab-pane>
      <el-tab-pane slot="changePassword" label="修改密码"></el-tab-pane>
      <el-tab-pane slot="forgetPassword" label="忘记密码"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { Tabs, TabPane } from "element-ui";
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
  },
};
</script>

<style lang="less" scoped>
.el-tabs__content{
    display: none;
}
</style>