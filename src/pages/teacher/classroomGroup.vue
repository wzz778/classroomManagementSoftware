<template>
  <div>
    <div :v-if="isUserRouter">
      <span >课堂： </span>
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
        ><i class="el-icon-plus"></i> 点击分组</el-button
      >
    </div>
    <!-- <el-empty v-if="tableDate.length==0" description="暂无回复内容"></el-empty> -->
    <GroupList v-for="(p,index) in tableDate" :key="p.groupName" :jsonText='JSON.stringify(p)' :groupIndex="index+1" />
    <el-dialog
      style="z-index: 2001"
      title="发布话题"
      append-to-body
      :visible.sync="dialogFormVisible"
    >
      <el-form
        label-position="right"
        label-width="120px"
        :model="form"
        ref="form"
      >
        <el-form-item label="按性别分组" prop="sex">
           <el-switch v-model="resex"></el-switch>
        </el-form-item>
        <el-form-item label="按成绩表现分组" prop="performance">
           <el-switch v-model="reperformance"></el-switch>
        </el-form-item>
        <el-form-item label="分组数量" prop="performance">
         <el-input-number v-model="form.studentNums" :min="1" :max="10" label="描述文字"></el-input-number>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('form')"
            >确认分组</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {Empty ,Switch,InputNumber} from "element-ui";
import { myCourse, grouping, groupInfo } from "@/api/admin/index";
import GroupList from "@/components/admin/GroupList";
export default {
  name: "classroomDiscussion",
  components: {
    [Empty.name]: Empty,
    [Switch.name]: Switch,
    [InputNumber.name]: InputNumber,
    GroupList
  },
  data() {
    return {
      courseArr: [],
      course: "",
      reperformance:false,
      resex:true,
      dialogFormVisible: false,
      isUserRouter:false,
      alltotal: 100,
      form: {
        performance: 0,
        sex: 1,
        courseId: '',
        studentNums:1
      },
      tableDate: [],
      tableNameDate: [],
      // rules: {
      // },
    };
  },
  methods: {
    getAllCourse() {
      myCourse({})
        .then((result) => {
          this.courseArr = result.data.records;
          this.course = this.courseArr[0].id;
          this.form.courseId = this.courseArr[0].id;
          this.chagepage();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    chagepage() {
      groupInfo({courseId:this.course})
        .then((data) => {
            console.log(data);
            if (data.status == 200) {
            let req = data.data;
            this.tableDate=[];
            for(let i in req){
                let newObject={
                    groupName:`${this.course+i}`,
                    groupArr:req[i]
                }
                this.tableDate.push(newObject)
            }
            // this.alltotal = req.allCount;
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
    submitForm(formName) {
      if(this.form.studentNums>10){
          this.$message({
            type: "warning",
            message: "分组数量不能超过10个",
          });
      }
      console.log(this.form);
      grouping(this.form)
        .then((result) => {
          console.log(result);
          if (result.status == 200) {
            this.$message({
              message: "创建成功",
              type: "success",
            });
            this.dialogFormVisible = false;
            this.chagepage()
          }else if(result.status == 555){
            this.$message({
              type: "warning",
              message: "分组人数不能超过在课堂的人数",
            });
          }
          else {
            this.$message({
              type: "warning",
              message: "操作失败",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  watch: {
    reperformance(newvalue){
      if(newvalue){
        this.form.performance=1;
      }else{
        this.form.performance=0;
      }
    },
    resex(newvalue){
      if(newvalue){
        this.form.sex=1;
      }else{
        this.form.sex=0;
      }
    }
  },
  created(){

  },
  mounted() {
    if(this.isUserRouter){

    }else{
      this.getAllCourse();
    }
    // this.$refs.topiclist.$on('deleteTopic',this.deleteTopic) //绑定自定义事件
    //  sessionStorage.setItem("AdminClassMessage",JSON.stringify(row))
  },
};
</script>

<style>
</style>