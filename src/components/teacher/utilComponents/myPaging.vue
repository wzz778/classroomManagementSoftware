<template>
  <div class="myPaging">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="nowPage"
      :page-sizes="[5, 10, 15, 20, 25]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="allNums"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "myPaging",
  //   定义接收参数：当前页数,总条数，每页条数，页数改变的函数，条数改变的函数
  props: ["nowPage", "allNums", "pageSize", "pageChangeFn", "sizeChangeFn"],
  methods: {
    handleSizeChange(val) {
      this.sizeChangeFn(val);
    },
    handleCurrentChange(val) {
      this.pageChangeFn(val);
    },
  },
};
</script>

<style lang="less" scoped>
.myPaging {
  margin-top: 10px;
}
</style>