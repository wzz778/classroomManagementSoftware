<template>
  <div class="mainBox">
    <template>
      <el-table :data="performanceInfo" style="width: 100%" :header-cell-style="{'text-align': 'center'}">
        <el-table-column prop="term" label="学期" width="180" align="center">
        </el-table-column>
        <el-table-column prop="timeInterval" label="时间" align="center"> </el-table-column>
        <el-table-column prop="performance" label="成绩" width="180" align="center">
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import { getPerformance, getTerm } from "@/api/student/yxyAxios";
import { Table, TableColumn } from "element-ui";
import jwt_decode from "jwt-decode";
export default {
  data() {
    return {
      performanceInfo: [],
    };
  },
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  mounted() {
    getTerm().then((res) => {
      let info = res.data.slice(-1);
      let data = {
        afterTime: info[0].beginTime,
        beforeTime: info[0].endTime,
        courseId: this.$route.query.id,
        userId: jwt_decode(this.$store.state.token).id,
      };
      getPerformance(data).then((result) => {
        result.data.slice(-1)[0].term = info[0].name;
        result.data.slice(-1)[0].timeInterval =
          info[0].beginTime + "~" + info[0].endTime;
        this.performanceInfo.push(result.data.slice(-1)[0]);
      });
    });
  },
};
</script>

<style lang="less" scoped>
.mainBox {
  width: 100%;
  height: 100%;
}
</style>