<template>
  <el-table
    :data="tableData"
    @selection-change="selectionChange"
    border
    style="width: 100%"
  >
    <template v-if="hasSelection">
      <el-table-column type="selection"></el-table-column>
    </template>
    <template v-for="typeObj in allType">
      <el-table-column
        :prop="typeObj.dateType"
        :label="typeObj.showName"
        :key="typeObj.name"
      >
      </el-table-column>
    </template>
    <el-table-column v-if="statueObj" label="状态" width="100px" prop="status">
      <template v-slot="scope">
        <el-tag :type="getStatus(scope.row.status)">{{
          getType(scope.row.status)
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="date"
      label="操作"
      v-if="objFn"
      :width="objFn.length == 3 ? 300 : 200"
    >
      <template slot-scope="scope">
        <template v-for="tempObj in objFn">
          <el-button
            class="btnSty"
            :type="tempObj.type"
            @click="tempObj.callFn(scope.row)"
            :key="tempObj.showInfo"
            plain
            >{{ tempObj.showInfo }}</el-button
          >
        </template>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { Tag } from "element-ui";
export default {
  name: "myList",
  components: {
    [Tag.name]: Tag,
  },
  // 接收数据，数据类型,函数对象
  props: ["tableData", "allType", "objFn", "hasSelection", "statueObj"],
  data() {
    return {
      selectData: null,
      choiceIds: [],
    };
  },
  methods: {
    selectionChange(val) {
      this.selectData = val;
      this.choiceIds = val.map((item) => {
        return item.id;
      });
    },
  },
  computed: {
    getStatus() {
      return function (status) {
        return status == 0 ? "success" : "warning";
      };
    },
    getType() {
      return function (status) {
        return status == 0 ? "启用" : "禁用";
      };
    },
  },
  mounted() {
  },
  beforeDestroy() {
    
  },
};
</script>

<style scoped>
.el-button {
  padding: 10px;
}
</style>