<template>
  <div id="adminindex">
    <el-form label-width="80px" style="width:300px;">
      <el-form-item style="width:500px;margin-bottom: 0px;" label="老师ID">
        <el-input style="width:150px;" v-model="searchform.userId" clearable></el-input>
        <el-button @click="find" type="primary" style="margin:0px 10px;">查询</el-button>
        <el-button @click="dialogFormVisible = true" type="button">添加课堂</el-button>
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
            <el-button @click="watchClick(scope.row.id)" type="text" size="small">详情</el-button>
            <el-button @click="editClick(scope.row.id)" type="text" size="small">编辑</el-button>
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
    <el-dialog style="z-index:2001;" title="幻灯片添加" append-to-body :visible.sync="dialogFormVisible">
      <el-upload
        class="upload-demo"
        ref="upload"
        action=""
        :http-request="postFile"
        :before-upload="handleBeup"
        :file-list="fileList"
        :headers="postHeader"
        drag
         :auto-upload="false"
        multiple
        >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">开始上传</el-button></div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button  @click="cleardialog" type="primary">完成</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {Image,Upload,Tag} from "element-ui";
import {getHerCourse,deleteCourse} from '@/api/admin/index'
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
        postHeader:{
          token:this.$store.state.token,
        },
        tableData:[],
        region:"",
        fileList: [],
        filetype:true,
        alltotal:0,
        searchform:{
          nodePage: 1,
          pageSize:5,
           userId:""
        }
      }
    },
    methods:{
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

      async postFile(){
        if(this.filetype){
          // let newfile=new FormData();
          // newfile.append('slideshows',data.file)
          // let rep=await addSlideshow(newfile);
          // if(rep.status==200){
          //     this.$message.success('上传成功');
          //   }else{
          //     this.$message.error('获取失败');
          //   }
        }else{
          this.$refs.upload.clearFiles()
        }
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      cleardialog(){
        this.dialogFormVisible=false;
        this.$refs.upload.clearFiles()
      },
      watchClick(row) {
        console.log(row);
      },
      editClick(row) {
        console.log(row);
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
        console.log(row);
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
        getHerCourse(this.searchform)
        .then(data=>{
          if(data.status==200){
            let req=data.data;
            this.tableData=req.records;
            this.alltotal=req.total;
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
      }//1368
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