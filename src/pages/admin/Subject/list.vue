<template>
  <div id="adminindex">
    <el-form label-width="80px" style="width:300px;">
      <el-form-item style="width:500px;margin-bottom: 0px;" label="老师ID">
        <el-input style="width:150px;" v-model="teacherid"></el-input>
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
        prop="date"
        label="日期">    
        </el-table-column>
        <el-table-column
        prop="name"
        label="姓名">
        </el-table-column>
        <el-table-column
        prop="province"
        label="省份">
        </el-table-column>
        <el-table-column
        prop="city"
        label="市区">
        </el-table-column>
        <el-table-column
        prop="url"
        label="图片"
>
        <template slot-scope="scope">
            <el-image 
                style="width: 100px; height: 100px"
                :src="scope.row.url" 
                :preview-src-list="[scope.row.url]"
                >
            </el-image>
        </template>
        </el-table-column>
        <el-table-column
        prop="zip"
        label="邮编"
        width="120">
        </el-table-column>
        <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
        </template>
        </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[3, 5, 10]"
      :page-size="3"
      layout="total, sizes, prev, pager, next, jumper"
      :total="100">
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
import {Image,Upload} from "element-ui";
// import {addSlideshow } from '@/myAxios/admin/wzzAxios'
export default {
    name:'SubjectList',
  components: {
    [Image.name]:  Image,
    [Upload.name]:  Upload
  },
    data() {
        const item = {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          zip: 200333
        };
      return {
        dialogFormVisible:false,
        formLabelWidth: '120px',
        currentPage: 1,
        postHeader:{
          token:this.$store.state.token,
        },
        tableData:Array(3).fill(item),
        region:"",
        fileList: [],
        filetype:true,
        teacherid:11
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
      handleClick(row) {
        console.log(row);
      },
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage=val;
        console.log(`当前页: ${val}`);
      },
      find() {
        console.log(this.region);
      },
    },
}
</script>
<style lang="less" scoped>
    #adminindex{
        width: 100%;
        min-height: 500px;
        background-color: #f8f8f8;
    }
</style>