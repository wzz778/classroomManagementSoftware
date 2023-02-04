<template>
  <div id="adminindex">
    <!-- 年级：
    <el-select v-model="level" placeholder="请选择活动区域">
      <el-option  v-for="p of $store.state.admin.allgrade" :key="p.index" :label="p" :value="p"></el-option>
    </el-select>
    <el-button @click="find" type="primary" style="margin:0px 10px;">查询</el-button> -->
    <el-table
        :data="tableData"
        :v-loading="true"
        border
        style="width: 100%;margin:10px 0;">
        <el-table-column
        fixed
        prop="id"
        label="班级ID"
         width="50"
        empty-text
       >    
        </el-table-column>
        <el-table-column
        prop="className"
        label="班级名称"
         width="100"
        > 
        </el-table-column>
        <el-table-column
        prop="code"
        label="班级码"
        width="110"
        >
        </el-table-column>
        <el-table-column
        prop="createName"
        label="创建人ID"
        width="60"
        >
        </el-table-column>
        <el-table-column
        prop="createTime"
        label="创建时间"
        >
        </el-table-column>
        <el-table-column
          prop="deleted"
          label="状态"
          width="70"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.deleted? 'warning' : 'success'">{{scope.row.deleted|toch()}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
        label="操作"
        >
        <template slot-scope="scope">
            <el-button @click="watchClick(scope.row)" type="success" size="small">人员</el-button>
            <el-button @click="editclick(scope.row)" type="primary" size="small">修改</el-button>
            <el-button @click="deleteClick(scope.row.id)" type="danger" size="small">删除</el-button>
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
    <el-dialog style="z-index:2001;" title="课堂封面更改" append-to-body :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="班级名称" :label-width="formLabelWidth">
          <el-input v-model="form.className" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" :label-width="formLabelWidth">
          <el-switch
            v-model="redeleted"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handelSend()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {Tag,Switch} from "element-ui";
import {getGrade,deleteGrade,updateGrade} from '@/api/admin/index'
export default {
  name:'ClassList',
  components: {
    [Tag.name]: Tag,
    [Switch.name]: Switch,
  },
    data() {
      return {
        currentPage: 1,
        tableData:[],
        level:"",
        pagesize:5,
        alltotal:0,
        dialogFormVisible: false,
        redeleted: false,
        searchform:{
          nodePage: 1,
          pageSize:5,
          gradeId:"",
          sex:''
        },
        form: {
          className: "",
          code: "",
          createName: 2,
          createTime: "",
          deleted: true,
          id: 0,
        },
        formLabelWidth: '80px'
      }
    },
    methods:{
      editclick(row) {
        console.log(row);
        this.dialogFormVisible=true;
        this.form=row;
      },
      watchClick(row) {
        console.log(row);
        this.$router.replace({
            name:"UsersList",
        })
        let searchform={
          nodePage: 1,
          pageSize:5,
          gradeId:row.id,
          sex:''
        }
        sessionStorage.setItem("usersListSearch",JSON.stringify(searchform))
        // sessionStorage.setItem("AdminClassMessage",JSON.stringify(row))
      },
      deleteClick(row) {
        this.$confirm("确定要删除课程吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          deleteGrade({ gradeId:row })
          .then((result) => {
            console.log(result);
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
        getGrade({beginIndex:this.searchform.nodePage,size:this.searchform.pageSize})
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
      handelSend() {
        console.log(this.form);
        updateGrade(this.form)
        .then(data=>{
          console.log(data);
          if(data.status==200){
              this.chagepage()
              this.$message({
                message: "修改成功",
                type: "success",
              });
              this.dialogFormVisible = true;
          }else{
            this.$message({
              type: "warning",
              message: "操作失败",
            });
          }
        })
        .catch(error=>{
            console.log(error);
        })
      },
    },
    filters:{
      toch(value){      
          if(!value){
            return "启用"
          }else{
            return "停用"
          }
      },//1368
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
      watch:{
        'form.deleted':{
            immediate:true,//刚开始就立刻调用
            deep:true,//配置该属性才可监视numbers中数据确切的改变  默认的false就会不显示changing
            handler(){
              this.redeleted=!this.form.deleted;
            }
        },
        'redeleted':{
            immediate:true,//刚开始就立刻调用
            deep:true,//配置该属性才可监视numbers中数据确切的改变  默认的false就会不显示changing
            handler(){
              this.form.deleted=!this.redeleted;
            }
        }
      },
      mounted(){
        this.chagepage()
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