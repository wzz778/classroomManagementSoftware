<template>
  <div id="adminindex">
    <el-form label-width="80px" style="width:300px;">
      <el-form-item style="width:500px;margin-bottom: 0px;" label="班级ID">
        <el-input style="width:150px;" v-model="searchform.gradeId" clearable></el-input>
        <el-button @click="find" type="primary" style="margin:0px 10px;">查询</el-button>
        <!-- <el-button @click="$router.replace({path:'edit'})" type="button">添加课堂</el-button> -->
      </el-form-item>
    </el-form>
    <el-table
        :data="tableData"
        :v-loading="true"
        border
        style="width: 100%;margin:10px 0;">
        <el-table-column
        fixed
        prop="studentId"
        label="用户ID"
         width="50"
        empty-text
       >    
        </el-table-column>
        <el-table-column
        fixed
        prop="name"
        label="用户名称"
         width="100"
        empty-text
       >    
        </el-table-column>
        <el-table-column
        prop="identity"
        label="身份"
        width="70"
        > 
        <template slot-scope="scope">
          {{scope.row.identity|toidentity()}}
        </template>
        </el-table-column>
        <el-table-column
        prop="userName"
        label="账号"
        width="130"
        > 
        </el-table-column>
        <el-table-column
        prop="email"
        label="邮箱"
        >
        </el-table-column>
        <el-table-column
        prop="createTime"
        label="创建时间"
        >
        </el-table-column>
        <!-- <el-table-column
          prop="isDeleted"
          label="状态"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.isDeleted? 'warning' : 'success'">{{scope.row.isDeleted|toch()}}</el-tag>
          </template>
        </el-table-column> -->
        <el-table-column
        label="操作"
        width="240"
        >
        <template slot-scope="scope">
            <el-button @click="editClick(scope.row)" type="primary" size="small">权限</el-button>
            <el-button @click="resetclick(scope.row.studentId)" type="warning" size="small">重置密码</el-button>
            <el-button @click="deleteClick(scope.row.studentId)" type="danger" size="small">删除</el-button>
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
      :total="alltotal">
    </el-pagination>
      <el-dialog style="z-index:2001;" title="权限更改" append-to-body :visible.sync="dialogFormVisible">
        <el-form
          label-position="right"
          label-width="80px"
          ref="form">
        <el-form-item label="课堂名称" prop="power">
          <el-radio-group v-model="form.power">
            <el-radio :label="0">学生</el-radio>
            <el-radio :label="1">老师</el-radio>
            <el-radio :label="2">管理员</el-radio>
          </el-radio-group>
        </el-form-item>
          <el-button type="primary" @click="handelEditSend()"
            >确认更改</el-button
          >
      </el-form>
      </el-dialog>
  </div>
</template>
<script>
import { Select, Option , Tag,Radio,RadioGroup} from "element-ui";
import {resetPassword,getAllUser,deleteUser,updatePower} from '@/api/admin/index'
export default {
  name:'UsersList',
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    [Tag.name]: Tag,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
  },
    data() {
      const item = {
        id: '1',
        subjectName: '语文',
        levelName: '年级',
        deleted:"34"
      };
      return {
        currentPage: 1,
        tableData:Array(0).fill(item),
        level:"",
        pagesize:5,
        alltotal:0,
        dialogFormVisible:false,
        form:{
          id:"",
          power:0,
        },
        searchform:{
          nodePage: 1,
          pageSize:5,
          gradeId:"",
          sex:''
        }
      }
    },
    methods:{
      editClick(row) {
        console.log(row);
        this.form.id=row.studentId
        this.form.power=row.identity
        this.dialogFormVisible=true;
      },
      watchClick(row) {
        console.log(row);
      },
      deleteClick(row) {
        this.$confirm("确定要删除用户吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          deleteUser({ id:row }).then((result) => {
            if(result.status==200){
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.chagepage();
            }else{
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
      },
      handelEditSend(){
        this.$confirm("确定要修改用户的权限吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          updatePower(this.form).then((result) => {
            if(result.status==200){
              this.$message({
                type: "success",
                message: "修改成功!",
              });
              this.dialogFormVisible=false
              this.chagepage();
            }else{
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
            message: "已取消修改",
          });
        });
      },
      resetclick(row){
        this.$confirm("确定要重置该用户的密码吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          resetPassword({ id:row }).then((result) => {
            if(result.status==200){
              this.$message({
                type: "success",
                message: "重置成功!",
              });
              this.chagepage();
            }else{
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
            message: "已取消重置",
          });
        });
      },
      handleSizeChange(val) {
        this.searchform.pageSize=val;
        this.chagepage()
      },
      handleCurrentChange(val) {
        this.searchform.nodePage=val;
        this.chagepage()
      },
      find() {
        this.searchform.nodePage=1;
        this.chagepage()
      },
      chagepage() {
        getAllUser(this.searchform)
        .then(data=>{
          console.log(data);
          if(data.status==200){
            let req=data.data;
            this.tableData=req.records;
            if(req.records.length==0){
              if(this.searchform.nodePage!=1){
                this.searchform.nodePage--;
                this.chagepage()
              }
            }
            this.alltotal=req.total;
          }else if(data.status==555){
            this.tableData=[]
          }
        })
        .catch(error=>{
            console.log(error);
        })
      },
    },
    filters:{
      // toch(value){      
      //     if(!value){
      //       return "启用"
      //     }else{
      //       return "停用"
      //     }
      // },//1368
      toidentity(value){
          if(value==0){
            return"学生"
          }else if(value==1){
            return"老师"
          }else{
            return"管理"
          }
      }
  },
  created(){
    if(sessionStorage.getItem("usersListSearch")){
      this.searchform=JSON.parse(sessionStorage.getItem("usersListSearch"))
    }
  },
   mounted(){
    this.chagepage()
  },
  beforeRouteLeave (to, from, next) {
    if(sessionStorage.getItem("usersListSearch")){
      sessionStorage.removeItem("usersListSearch")
    }
    next()
  }
}
</script>
<style lang="less" scoped>
    #adminindex{
        width: 100%;
        min-height: 500px;
        background-color: #f8f8f8;
        .panelbox{
          width: 100%;
          display: flex;
          justify-content:space-around;
          flex-wrap: wrap;
        }
    }
</style>