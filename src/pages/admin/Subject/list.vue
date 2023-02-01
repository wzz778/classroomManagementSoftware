<template>
  <div id="adminindex">
    <el-form label-width="80px" style="width:300px;">
      <el-form-item style="width:500px;margin-bottom: 0px;" label="创建人ID">
        <el-input style="width:150px;" v-model="searchform.userId" clearable></el-input>
        <el-button @click="find" type="primary" style="margin:0px 10px;">查询</el-button>
        <el-button @click="$router.replace({path:'edit'})" type="button">添加课堂</el-button>
      </el-form-item>
    </el-form>
    <el-table
        :data="tableData"
        border
        style="width: 100%;margin:10px 0;">
        <el-table-column
        fixed
        prop="courseName"
        label="课堂名称">    
        </el-table-column>
        <el-table-column
        prop="courseCode"
        label="课堂码">
        </el-table-column>
        <el-table-column
        prop="cover"
        label="课堂封面">
          <template slot-scope="scope">
              <el-image 
                  style="width: 100px; height: 100px"
                  :src="scope.row.cover" 
                  :preview-src-list="[scope.row.cover]"
                  >
              </el-image>
          </template>
        </el-table-column>
        <el-table-column
        prop="createTime"
        label="创建时间">
        </el-table-column>
        <el-table-column
        prop="isDeleted"
        label="状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isDeleted?'warning' : 'success'">{{scope.row.isDeleted|toch()}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
        prop="creatorId"
        label="创建人ID">
        </el-table-column>
        <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
            <el-button @click="watchClick(scope.row)" type="text" size="small">人员</el-button>
            <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteClick(scope.row.id)" type="text" size="small">禁用</el-button>
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
      <el-form
        label-position="right"
        label-width="100px"
        ref="form"
      >
      <!-- <el-form-item label="课堂名称" prop="courseName">
        <el-input v-model="form.courseName" clearable></el-input>
      </el-form-item>
      <el-form-item  label="课堂简介" prop="details">
        <el-input type="textarea"  v-model="form.details" clearable></el-input>
      </el-form-item> -->
      <el-form-item label="上传图片">
        <el-upload
          class="upload-demo"
          ref="upload"
          action=""
          :on-remove="handleRemove"
          :file-list="fileList"
          :on-change="handelChange"
          name="cover"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
          >
        </el-upload>
      </el-form-item>
      <el-form-item label="图片预览">
        <div class="cardImg" v-show="picSrc">
          <img style="height: 200px;" :src="picSrc" alt="" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handelEditSend()"
          >确认更改</el-button
        >
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {Image,Upload,Tag} from "element-ui";
import {getHerCourse,deleteCourse,updateCover} from '@/api/admin/index'
export default {
    name:'SubjectList',
  components: {
    [Image.name]:  Image,
    [Upload.name]:  Upload,
    [Tag.name]: Tag,
  },
    data() {
      return {
        dialogFormVisible:false,
        formLabelWidth: '120px',
        currentPage: 1,
        tableData:[],
        region:"",
        fileList: [],
        editid: 0,
        filetype:true,
        alltotal:0,
        picSrc:'',
        searchform:{
          nodePage: 1,
          pageSize:5,
          userId:""
        }
      }
    },
    methods:{
      //判断文件格式和大小
      handleBeup(file){
        const isJPG = file.type === 'image/jpeg'|'image/png';
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isJPG) {
          this.$message.error( '上传头像图片只能是图片格式! ');
        }
        if (!isLt5M ) {
          this.$message.error( '上传图片大小帮你超过5MB！ ');
        }
        this.filetype= isJPG&&isLt5M;
      },  
      cleardialog(){
        this.dialogFormVisible=false;
      },
      watchClick(row) {
        console.log(row);
        this.$router.replace({
            path:"userlist",
        })
        sessionStorage.setItem("AdminClassMessage",JSON.stringify(row))
      },
      editClick(row) {
        console.log(row);
        this.dialogFormVisible=true;
        this.editid=row.id;
        // sessionStorage.setItem("classformmessage",JSON.stringify(row))
        // this.$router.replace({
        //     path:"edit",
        //         query:{
        //             id:row.id,
        //         }
        // })
      },      
      deleteClick(row) {
        this.$confirm("确定要删除课程吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          deleteCourse({ id:row }).then((result) => {
            if(result.status==200){
              this.$message({
                type: "success",
                message: "停用成功!",
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
        console.log(row);
      },
      //显示功能
      //主键页数的处理
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
      //数据的渲染
      chagepage() {
        getHerCourse(this.searchform)
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
      //课堂的编辑功能
      handelChange(file, fileList) {
        console.log(file);
        console.log(fileList);
        let f = new FileReader();
        f.readAsDataURL(file.raw);
        f.onload = () => {
          this.picSrc = f.result;
        };
        fileList = fileList.slice(-1);
        this.fileList = fileList;
      },
      handleRemove(file, fileList) {
        console.log(fileList);
        this.fileList = fileList;
        this.picSrc = "";
      },
      resetForm(){
        this.fileList = [];
        this.picSrc = "";
      },
      handelEditSend() {
            //判断是否为空值
            if (this.fileList.length == 0) {   
              this.$message({
                message: "请上传封面",
                type: "warning",
              });
              return;
            }
            //   这里需要判断一下文件大小或者类型
            //   自定义上传就需要我们使用fromdata对象来上传文件
            let formdata = new FormData();
            console.log(this.fileList);
            for (let i = 0; i < this.fileList.length; i++) {
              // 我们上传的文件保存在每个文件对象的raw里边
              formdata.append("newCover", this.fileList[i].raw);
            }
            //   添加其他属性
            formdata.append("id", this.editid);
            // 发送请求
             updateCover(formdata)
              .then((result) => {
                if(result.status==200){
                  this.$message({
                    message: "更改成功",
                    type: "success",
                  });
                  this.dialogFormVisible=false;
                  this.fileList = [];
                  this.picSrc = "";
                  this.chagepage()
                }else{
                  this.$message({
                    type: "warning",
                    message: "操作失败",
                  });
                }
                console.log(result);
              })
              .catch((err) => {
                console.log(err);
              });

    },
    },
    filters:{
      toch(value){      
          if(!value){
            return "启用"
          }else{
            return "停用"
          }
      }//
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
    }
</style>