<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="5" v-if="inputInfoObj">
        <el-form label-width="80px">
          <el-form-item :label="inputInfoObj.showName">
            <el-input
              v-model="value1"
              clearable
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="5">
        <el-form label-width="80px">
          <el-button type="primary" @click="sureSerach">查询</el-button>
          <template v-if="buttonInfo">
            <!-- 添加,buttonInfo的type是true的话是添加否则是导入 -->
            <el-button
              v-if="buttonInfo.type"
              type="success"
              @click="buttonInfo.clickFn"
              >添加</el-button
            >
          </template>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Col, Row, Dropdown, DropdownMenu, DropdownItem } from "element-ui";
export default {
  name: "myTop",
  /* 
  input对象
      是否显现,显现的名字
  select对象
      每个是否显现,显现的名字，显现的是啥，请求的接口名字
  */
  props: ["inputInfoObj", "searchFn", "buttonInfo"],
  components: {
    [Col.name]: Col,
    [Row.name]: Row,
    [Option.name]: Option,
    [Dropdown.name]: Dropdown,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
  },
  data() {
    return {
      value: "",
      value1: "",
    };
  },
  methods: {
    sureSerach() {
      let tempObj = {};
      this.searchFn(tempObj);
    },
    getAll() {},
  },
  mounted() {
    this.getAll();
  },
};
</script>

<style scoped>
.el-dropdown-menu {
  padding: 20px;
}

.el-dropdown {
  margin-left: 20px;
}
</style>