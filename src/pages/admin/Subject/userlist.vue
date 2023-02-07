<template>
  <div id="adminindex">
    <el-form label-width="80px" style="width: 300px">
      <el-form-item style="width: 500px; margin-bottom: 0px" label="课程ID">
        <el-input
          style="width: 150px"
          v-model="searchform.classId"
          clearable
        ></el-input>
        <el-button @click="find" type="primary" style="margin: 0px 10px"
          >查询</el-button
        >
        <el-button
          @click="
            $router.push({
              path: 'list',
            })
          "
          type="primary"
          style="margin: 0px 10px"
          >返回课程列表</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      :v-loading="true"
      border
      style="width: 100%; margin: 10px 0"
    >
      <el-table-column
        fixed
        prop="studentId"
        label="用户ID"
        width="50"
        empty-text
      >
      </el-table-column>
      <el-table-column prop="identity" label="身份" width="70">
        <template slot-scope="scope">
          {{ scope.row.identity | toidentity() }}
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="账号"> </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间"> </el-table-column>
      <el-table-column prop="isDeleted" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isDeleted ? 'warning' : 'success'">{{
            scope.row.isDeleted | toch()
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="editclick(scope.row.studentId)"
            type="primary"
            size="small"
            >修改</el-button
          >
          <el-button
            @click="deleteClick(scope.row.studentId)"
            type="danger"
            size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="searchform.nodePage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="searchform.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="alltotal"
    >
    </el-pagination>
    <!-- <div>{{tableDatas}}</div> -->
  </div>
</template>
<script>
import { Select, Option, Tag } from "element-ui";
import { courseStudents, deleteUser } from "@/api/admin/index";
export default {
  name: "SubjectUsersList",
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    [Tag.name]: Tag,
  },
  data() {
    const item = {
      id: "1",
      subjectName: "语文",
      levelName: "年级",
      deleted: "34",
    };
    return {
      currentPage: 1,
      tableData: Array(0).fill(item),
      level: "",
      pagesize: 5,
      alltotal: 100,
      searchform: {
        nodePage: 1,
        pageSize: 5,
        classId: 0,
      },
    };
  },
  methods: {
    editclick(row) {
      // console.log(row);
      sessionStorage.setItem("formmessage", JSON.stringify(row));
      this.$router.replace({
        path: "edit",
        query: {
          id: row.id,
        },
      });
    },
    watchClick(row) {
      // console.log(row);
    },
    editClick(row) {
      // console.log(row);
    },
    deleteClick(row) {
      this.$confirm("确定要删除课程吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteUser({ id: row }).then((result) => {
            if (result.status == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.chagepage();
            } else {
              this.$message({
                type: "warning",
                message: "操作失败",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      // console.log(row);
    },
    handleSizeChange(val) {
      this.searchform.pageSize = val;
      this.chagepage();
    },
    handleCurrentChange(val) {
      this.searchform.nodePage = val;
      this.chagepage();
    },
    find() {
      this.searchform.nodePage = 1;
      this.chagepage();
    },
    chagepage() {
      courseStudents(this.searchform)
        .then((data) => {
          // console.log(data);
          if (data.status == 200) {
            let req = data.data;
            this.tableData = req.records;
            if (req.records.length == 0) {
              if (this.searchform.nodePage != 1) {
                this.searchform.nodePage--;
                this.chagepage();
              }
            }
            this.alltotal = req.total;
          } else if (data.status == 555) {
            this.tableData = [];
          }
        })
        .catch((error) => {
          // console.log(error);
        });
    },
  },
  filters: {
    toch(value) {
      if (!value) {
        return "启用";
      } else {
        return "停用";
      }
    }, //1368
    toidentity(value) {
      if (value == 0) {
        return "学生";
      } else if (value == 1) {
        return "老师";
      } else {
        return "管理";
      }
    },
  },
  mounted() {
    let data = JSON.parse(sessionStorage.getItem("AdminClassMessage"));
    this.searchform.classId = data.id;
    this.chagepage();
  },
};
</script>
<style lang="less" scoped>
#adminindex {
  width: 100%;
  min-height: 500px;
  background-color: #f8f8f8;
  .panelbox {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
}
</style>