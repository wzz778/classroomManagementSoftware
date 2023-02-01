<template>
  <div>
    <span>话题内容：</span>
    <!-- <TopicList ref="topiclist" style="width:100%" headImg="https://online-examination-1311156839.cos.ap-nanjing.myqcloud.com/photo/20230114130755_-589934592.webp" title="试卷总数" number="18"/> -->
    <span>回复内容：</span>
    <div class="discussionBox">
      <TopicList ref="topiclist" style="width:100%" headImg="https://online-examination-1311156839.cos.ap-nanjing.myqcloud.com/photo/20230114130755_-589934592.webp" title="试卷总数" number="18"/>
    </div>
    <el-dialog style="z-index:2001;" title="发布话题" append-to-body :visible.sync="dialogFormVisible">
      <el-form
        label-position="right"
        label-width="80px"
        :rules="rules"
        :model="form"
        ref="form">
      <el-form-item label="话题标题" prop="topicName">
        <el-input v-model.trim="form.topicName" clearable></el-input>
      </el-form-item>
      <el-form-item  label="话题内容" prop="topicContent">
        <el-input type="textarea"  v-model.trim="form.topicContent" clearable></el-input>
      </el-form-item>
       <el-form-item>
        <el-button type="primary" @click="submitForm('form')"
          >确认更改</el-button
        >
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="searchform.beginIndex"
    :page-sizes="[5, 10, 15, 20]"
    :page-size="searchform.size"
    layout="total, sizes, prev, pager, next, jumper"
    :total="alltotal">
  </el-pagination>
  <el-button type="success" @click="addTopic"><i class="el-icon-plus"></i>  添加话题</el-button>
  </div>
</template>

<script>
import { } from "element-ui";
import { myCourse ,publishTopic,getTopic} from "@/api/admin/index";
import TopicList from '@/components/admin/TopicList'
import DiscussList from '@/components/admin/DiscussList'
export default {
  name: "discussionDetails",
  components: {
    [Option.name]: Option,
    TopicList,
    DiscussList
  },
  data() {
    return {
      dialogFormVisible:false,
      alltotal:100,
      form:{
        topicName:"",
        topicContent:"",
        courseId:11
      },
      tableData:[
      {
        "user": {
          "studentId": 10,
          "userName": "20030302123",
          "password": "$2a$10$LwPMjd0ubsLXV0ZP5kIhpuMCJHLp8kaQMy5O0go9lXtrLmppRwRqG",
          "email": "3190493163@qq.com",
          "photo": "https://online-examination-1311156839.cos.ap-nanjing.myqcloud.com/photo/20230131135914_2000000000.jpg",
          "sex": "女",
          "name": "无",
          "gradeId": 0,
          "nativePlace": "无",
          "identity": 0,
          "createTime": "2023-01-31 13:59:49",
          "updateTime": null,
          "isDeleted": 0
        },
        "discuss": {
          "id": 2,
          "topicId": 2,
          "sendId": 10,
          "fromId": null,
          "level": 1,
          "superId": 0,
          "content": "11111111111",
          "createTime": "2023-01-31 16:16:40"
        },
      },
      {
        "user": {
          "studentId": 10,
          "userName": "20030302123",
          "password": "$2a$10$LwPMjd0ubsLXV0ZP5kIhpuMCJHLp8kaQMy5O0go9lXtrLmppRwRqG",
          "email": "3190493163@qq.com",
          "photo": "https://online-examination-1311156839.cos.ap-nanjing.myqcloud.com/photo/20230131135914_2000000000.jpg",
          "sex": "女",
          "name": "无",
          "gradeId": 0,
          "nativePlace": "无",
          "identity": 0,
          "createTime": "2023-01-31 13:59:49",
          "updateTime": null,
          "isDeleted": 0
        },
        "discuss": {
          "id": 3,
          "topicId": 2,
          "sendId": 10,
          "fromId": null,
          "level": 1,
          "superId": 0,
          "content": "11111111111",
          "createTime": "2023-01-31 16:16:56"
        },
      },
      ],
      searchform:{
        beginIndex: 1,
        size:5,
        courseId:11,
      },
      rules: {
        topicName: [
          { required: true, message: "请输入话题标题", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" },
        ],
        topicContent: [
          { required: true, message: "请输入话题内容", trigger: "blur" },
          { min: 3, max: 300, message: "长度在 3 到 300 个字符", trigger: "blur" },
        ],
      },
    }
  },
  methods: {
    handleSizeChange(val) {
      this.searchform.pageSize=val;
      this.chagepage()
    },
    handleCurrentChange(val) {
      this.searchform.nodePage=val;
      this.chagepage()
    },
    getAllCourse() {
      myCourse({})
        .then((result) => {
          this.courseArr = result.data.records;
          this.course = this.courseArr[0].id;
          this.chagepage();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    chagepage(){
      console.log(this.searchform);
      // getTopic(this.searchform)
      //   .then(data=>{
      //     console.log(data);
      //     if(data.status==200){
      //       let req=data.data;
      //       this.tableData=req.records;
      //       if(req.records.length==0){
      //         if(this.searchform.nodePage!=1){
      //           this.searchform.nodePage--;
      //           this.chagepage()
      //         }
      //       }
      //       this.alltotal=req.total;
      //     }else if(data.status==555){
      //       this.tableData=[]
      //     }
      //   })
      //   .catch(error=>{
      //       console.log(error);
      //   })
        console.log(this.tableData);
    },
    addTopic(){
      this.dialogFormVisible=true;
    },
    // deleteTopic(id){
    //   console.log(id);
    // },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // publishTopic(this.form)
          // .then((result) => {
          //   if(result.status==200){
          //     this.$message({
          //       message: "创建成功",
          //       type: "success",
          //     });
          //     this.dialogFormVisible=false;
          //     this.$refs['form'].resetFields();
          //   }else{
          //     this.$message({
          //       type: "warning",
          //       message: "操作失败",
          //     });
          //   }
          // })
          // .catch((err) => {
          //   console.log(err);
          // });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted() {
      this.getAllCourse();
      // this.$refs.topiclist.$on('deleteTopic',this.deleteTopic) //绑定自定义事件
  },
};
</script>

<style lang="less" scoped>
  .discussionBox{
    width: 100%;
    padding: 5px;
    background-color: #f6f6f6;
    border-radius: 5px;
  }
</style>