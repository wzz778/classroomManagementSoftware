<template>
  <div class="mainBox">
    <template>
      <el-table
        :data="performanceInfo"
        style="width: 100%"
        :header-cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column prop="term" label="学期" width="180" align="center">
        </el-table-column>
        <el-table-column prop="timeInterval" label="时间" align="center">
        </el-table-column>
        <el-table-column
          prop="performance"
          label="成绩"
          width="180"
          align="center"
        >
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import { getPerformance, getTerm } from "@/api/student/yxyAxios";
import { Message, Table, TableColumn } from "element-ui";
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
    getTerm()
      .then((res) => {
        let info = res.data;
        let termIds = [];
        for (let i = 0; i < info.length; i++) {
          termIds.push({
            termId: info[i].id,
            courseId: this.$route.query.id,
            userId: jwt_decode(this.$store.state.token).id,
          });
        }
        for (let i = 0; i < termIds.length; i++) {
          getPerformance(termIds[i]).then((result) => {
            if (result.status == 200) {
              this.performanceInfo.push({
                performance: result.data.slice(-1)[0].performance,
                term: info[i].name,
                timeInterval: info[i].beginTime + "~" + info[i].endTime,
              });
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Message.err("网络异常，数据获取失败！");
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