<template>
  <el-container>
    <el-header>Header</el-header>
    <el-main>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :cell-style="{ 'text-align': 'center' }"
        :header-cell-style="{
          'text-align': 'center',
          height: '40px',
          lineHeight: '40px',
          padding: 0,
        }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="80"> </el-table-column>
        <el-table-column
          label=""
          :cell-style="{ 'text-align': 'left' }"
          prop="title"
          tableData
        >
        </el-table-column>
        <el-table-column
          prop="person"
          label="发件人"
          width="240"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="date"
          label="时间"
          width="240"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import {
  Container,
  Header,
  Main,
  Table,
  TableColumn,
  Button,
} from "element-ui";
export default {
  data() {
    return {
      tableData: [
        {
          title: "考试通知",
          date: "2016-05-03",
          person: "线性代数",
        },
        {
          title: "考试通知",
          date: "2016-05-02",
          person: "线性代数",
        },
        {
          title: "考试通知",
          date: "2016-05-04",
          person: "线性代数",
        },
        {
          title: "考试通知",
          date: "2016-05-01",
          person: "线性代数",
        },
        {
          title: "考试通知",
          date: "2016-05-08",
          person: "线性代数",
        },
        {
          title: "考试通知",
          date: "2016-05-06",
          person: "线性代数",
        },
        {
          title: "考试通知",
          date: "2016-05-07",
          person: "线性代数",
        },
        {
          title: "考试通知",
          date: "2016-05-07",
          person: "线性代数",
        },
        {
          title: "考试通知",
          date: "2016-05-07",
          person: "线性代数",
        },
        {
          title: "考试通知",
          date: "2016-05-07",
          person: "线性代数",
        },
      ],
      multipleSelection: [],
    };
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
  components: {
    [Container.name]: Container,
    [Header.name]: Header,
    [Main.name]: Main,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Button.name]: Button,
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.msgInfo {
  display: flex;
  width: 100%;
  height: 70px;
  align-items: center;
  margin: 10px 0;
  background-color: #fff;
  justify-content: space-between;
}

.msg {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  .msgTitle {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    font-size: 15px;
    color: #666;
  }
  .msgPerson {
    display: inline-block;
    height: 25px;
    line-height: 25px;
    font-size: 13px;
  }
}
.msgDate {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin-right: 50px;
}
</style>