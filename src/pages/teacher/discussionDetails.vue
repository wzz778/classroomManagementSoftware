<template>
  <div>
    <el-button size="medium" type="success" round @click="addDiscuss"><i class="el-icon-plus"></i>  添加评论</el-button>
    <TitleBlock text="话题内容"/>
    <TopicList ref="topicList"  style="width:100%" :showmore='false' :jsonText="JSON.stringify(this.topicform)"/>
    <TitleBlock text="回复内容"/>
    <div class="discussionBox">
    <el-empty v-if="discussionDate.length==0" description="暂无回复内容"></el-empty>
    <DiscussList v-for="(p) of discussionDate"  :key="p.discuss.id"  style="width:100%" :jsonText="JSON.stringify(p)"/>
    </div>
    <el-dialog style="z-index:2001;" title="发布话题" append-to-body :visible.sync="dialogFormVisible">
      <el-form
        label-position="right"
        label-width="80px"
        :rules="rules"
        :model="form"
        ref="form">
      <el-form-item  label="话题内容" prop="topicContent">
        <el-input type="textarea"  v-model.trim="form.content" clearable></el-input>
      </el-form-item>
       <el-form-item>
        <el-button type="primary" @click="submitForm('form')"
          >确认评论</el-button
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
  </div>
</template>

<script>
import {Empty } from "element-ui";
import {getAllDiscuss,publishDiscuss} from "@/api/admin/index";
import TopicList from '@/components/admin/TopicList'
import DiscussList from '@/components/admin/DiscussList'
import TitleBlock from '@/components/admin/TitleBlock'
export default {
  name: "discussionDetails",
  components: {
    [Empty.name]: Empty,
    TopicList,
    DiscussList,
    TitleBlock
  },
  data() {
    return {
      dialogFormVisible:false,
      alltotal:0,
      topicform:{},
      form:{
        level:1,
        content:"",
        topicId:"",
        sendId:11,
      },
      discussionDate:[],
      searchform:{
        beginIndex: 1,
        size:5,
        topicId:"",
      },
      rules: {
        content: [
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
      // console.log("sdas");
        getAllDiscuss(this.searchform)
        .then((data) => {
          console.log(data);
          if (data.status == 200) {
            let req = data.data;
            this.discussionDate = req.list;
            if (req.list.length == 0) {
              if (this.searchform.beginIndex != 1) {
                this.searchform.beginIndex--;
                this.chagepage();
              }
            }
            this.alltotal = req.allCount;
          } else if (data.status == 555) {
            this.discussionDate = [];
          }
        })
        .catch((error) => {
          console.log(error);
        });

    },
    addDiscuss(){
      this.dialogFormVisible=true;
    },
    // deleteTopic(id){
    //   console.log(id);
    // },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          publishDiscuss(this.form)
          .then((result) => {
            if(result.status==200){
              this.$message({
                message: "创建成功",
                type: "success",
              });
              this.dialogFormVisible=false;
              this.$refs['form'].resetFields();
              this.chagepage()
            }else{
              this.$message({
                type: "warning",
                message: "操作失败",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
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
  created(){
    if(localStorage.getItem("topicForm")){
      this.topicform=JSON.parse(localStorage.getItem("topicForm"));
      this.searchform.topicId=this.topicform.topic.id;
      this.form.topicId=this.topicform.topic.id;
    }else{
      this.$router.push({
        path:"classroomDiscussion",
        })
    }
    
  },
  mounted() {
    this.chagepage();
    this.$refs.topicList.$on('addDiscuss',this.addDiscuss) //绑定自定义事件
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