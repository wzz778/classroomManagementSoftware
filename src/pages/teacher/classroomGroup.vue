<template>
  <div>
    <TitleBlock text="课堂话题"/>
    课堂：
    <el-select v-model="course" placeholder="请选择">
      <el-option
        v-for="item in courseArr"
        :key="item.id"
        :label="item.courseName"
        :value="item.id"
      ></el-option>
    </el-select>
    <span style="margin-left: 20px"></span>
    <el-button type="primary" @click="chagepage"
      ><i class="el-icon-search"></i> 查询</el-button
    >
    <el-button type="success" @click="addTopic"
      ><i class="el-icon-plus"></i> 添加话题</el-button
    >
    <!-- <el-empty v-if="tableDate.length==0" description="暂无回复内容"></el-empty> -->

    <el-dialog
      style="z-index: 2001"
      title="发布话题"
      append-to-body
      :visible.sync="dialogFormVisible"
    >
      <el-form
        label-position="right"
        label-width="80px"
        :rules="rules"
        :model="form"
        ref="form"
      >
        <el-form-item label="话题标题" prop="topicName">
          <el-input v-model.trim="form.topicName" clearable></el-input>
        </el-form-item>
        <el-form-item label="话题内容" prop="topicContent">
          <el-input
            type="textarea"
            v-model.trim="form.topicContent"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')"
            >确认发布</el-button
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
      :total="alltotal"
    >
    </el-pagination>
    <!-- 卧龙凤雏 -->
    <template>
      <div v-if="false">
      {{tableDate}}{{deleteid}}
      </div>
    </template>
    <!-- 卧龙凤雏 -->
  </div>
</template>

<script>
import {Empty } from "element-ui";
import { myCourse, groupingAnd, groupInfo } from "@/api/admin/index";
import TopicList from "@/components/admin/TopicList";
import TitleBlock from "@/components/admin/TitleBlock";
export default {
  name: "classroomDiscussion",
  components: {
    [Empty.name]: Empty,
    TopicList,
    TitleBlock
  },
  data() {
    return {
      courseArr: [],
      course: "",
      dialogFormVisible: false,
      alltotal: 100,
      form: {
        topicName: "",
        topicContent: "",
        courseId: '',
      },
      tableDate: [],
      searchform: {
        beginIndex: 1,
        size: 5,
        courseId: '',
      },
      rules: {
        topicName: [
          { required: true, message: "请输入话题标题", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        topicContent: [
          { required: true, message: "请输入话题内容", trigger: "blur" },
          {
            min: 3,
            max: 300,
            message: "长度在 3 到 300 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleSizeChange(val) {
      this.searchform.beginIndex = val;
      this.chagepage();
    },
    handleCurrentChange(val) {
      this.searchform.beginIndex = val;
      this.chagepage();
    },
    getAllCourse() {
      myCourse({})
        .then((result) => {
          this.courseArr = result.data.records;
          this.course = this.courseArr[0].id;
          this.searchform.courseId = this.courseArr[0].id;
          this.form.courseId = this.courseArr[0].id;
          this.searchform.beginIndex = 1;
          this.chagepage();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    chagepage() {
      groupInfo(this.searchform)
        .then((data) => {
          console.log(data);
          if (data.status == 200) {
            let req = data.data;
            this.tableDate = req.list;
            if (req.list.length == 0) {
              if (this.searchform.nodePage != 1) {
                this.searchform.nodePage--;
                this.chagepage();
              }
            }
            this.alltotal = req.allCount;
          } else if (data.status == 555) {
            this.tableDate = [];
          }
        })
        .catch((error) => {
          console.log(error);
        });
      // console.log(this.tableDate);
    },
    addTopic() {
      this.dialogFormVisible = true;
    },
    deleteTopic(id) {
      console.log(id);
    },

    submitForm(formName) {
      this.retext=!this.retext;
      // console.log(this.tableDate);
      this.$refs[formName].validate((valid) =>{
        if (valid) {
          groupingAnd(this.form)
            .then((result) => {
              if (result.status == 200) {
                this.$message({
                  message: "创建成功",
                  type: "success",
                });
                this.dialogFormVisible = false;
                this.$refs["form"].resetFields();
                this.chagepage()
              } else {
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
  watch: {
    "searchform.beginIndex": {
      immediate: true, //
      deep: true, //配置该属性才可监视numbers中数据确切的改变  默认的false就会不显示changing
      handler() {
        sessionStorage.setItem("Topicpage", this.searchform.beginIndex);
        // this.tableDate=this.numberArr.splice(index, 1, sum);
      },
    },
  },
  
  computed:{
    deleteid(){
      // console.log(this.$store.state.admin.deleteTopicid);
      if(this.$store.state.admin.deleteTopicid){
        this.chagepage()
      }
      return this.$store.state.admin.deleteTopicid;
    }
  },
  mounted() {
    if (sessionStorage.getItem("Topicpage")) {
      this.searchform.beginIndex = parseInt(
        sessionStorage.getItem("Topicpage")
      );
    } else {
      sessionStorage.setItem("Topicpage", 1);
    }
    this.getAllCourse();
    // this.$refs.topiclist.$on('deleteTopic',this.deleteTopic) //绑定自定义事件
    //  sessionStorage.setItem("AdminClassMessage",JSON.stringify(row))
  },
};
</script>

<style>
</style>