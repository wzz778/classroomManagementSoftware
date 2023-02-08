<template>
  <div id="adminindex">
    <el-button @click="dialogFormVisible=true;" type="primary" style="margin:0px 10px;">添加学年</el-button>
    <el-table
        :data="tableData"
        :v-loading="true"
        border
        style="width: 100%;margin:10px 0;">
        <el-table-column
        fixed
        prop="id"
        label="学期ID"
        empty-text
       >    
        </el-table-column>
        <el-table-column
        fixed
        prop="name"
        label="学期名称"
        empty-text
       >    
        </el-table-column>
        <el-table-column
        prop="beginTime"
        label="开始时间"
        > 
        </el-table-column>
        <el-table-column
        prop="endTime"
        label="接收时间"
        >
        </el-table-column>
        <el-table-column
        label="操作"
        >
        <template slot-scope="scope">
            <el-button @click="deleteClick(scope.row.id)" type="danger" size="small">删除</el-button>
        </template>
        </el-table-column>
    </el-table>
    共  {{alltotal}}  个课程
    <el-dialog style="z-index:2001;" title="学年添加" append-to-body :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="班级名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="时间区间" :label-width="formLabelWidth">
            <el-date-picker
                v-model="time"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
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
import {DatePicker} from "element-ui";
import {getTerm,addTerm} from '@/api/admin/index'
export default {
  name:'ClassList',
  components: {
    [DatePicker.name]: DatePicker,    
  },
    data() {
      return {
        tableData:[],
        alltotal:0,
        dialogFormVisible: false,
        time:[],
        form: {
          beginTime: "",
          endTime: "",
          name:''
        },
        formLabelWidth: '80px'
      }
    },
    methods:{
      deleteClick(row) {
        this.$message({
        type: "warning",
        message: "暂不能删除!",
        });
        // this.$confirm("确定要删除课程吗?", "提示", {
        //   confirmButtonText: "确定",
        //   cancelButtonText: "取消",
        //   type: "warning",
        // })
        // .then(() => {
        //   deleteGrade({ gradeId:row })
        //   .then((result) => {
        //     // console.log(result);
        //     if(result.status==200){
        //       this.$message({
        //         type: "success",
        //         message: "删除成功!",
        //       });
        //       this.chagepage();
        //     }else{
        //       this.$message({
        //         type: "warning",
        //         message: "操作失败",
        //       });
        //     }
        //   });
        // })
        // .catch(() => {
        //   this.$message({
        //     type: "info",
        //     message: "已取消删除",
        //   });
        // });
      },
      handelSend(){
        if (this.form.name.replace(/(^\s*)|(\s*$)/g, "") == "") {
            this.$message({
                message: "请输入学期名称",
                type: "warning",
            });
            return;
        }
        if(this.form.beginTime==''||this.form.endTime==''){
            this.$message({
                message: "请输入完整学期时间",
                type: "warning",
            });
            return;
        }
        this.$confirm("确定要添加学年吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          addTerm(this.form)
          .then((result) => {
            if(result.status==200){
              this.$message({
                type: "success",
                message: "添加成功!",
              });
              this.dialogFormVisible=true
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
            message: "已取消添加",
          });
        });
      },
      chagepage() {
        getTerm().then(data=>{
          if(data.status==200){
           this.tableData=data.data;
            this.alltotal=this.tableData.length;
          }else if(data.status==555){
            this.tableData=[]
          }
        })
        .catch(error=>{
            // console.log(error);
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
        time(newValue){
            if(newValue){
                this.form.beginTime=newValue[0];
                this.form.endTime=newValue[1];
            }else{
                this.form.endTime=''
                this.form.beginTime=''
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