<template>
  <div>
    <myTop
      :seletcInfoObjOne="myTopConfiguration.seletcInfoObjOne"
      :buttonInfo="myTopConfiguration.buttonInfo"
      :getInfo="getInfo"
    ></myTop>
    <!-- 列表 -->
    <myList
      :tableData="myListConfiguration.tableData"
      :allType="myListConfiguration.allType"
      :objFn="myListConfiguration.objFn"
    >
    </myList>
    <!-- 分页 -->
    <myPaging
      :nowPage="nowPage"
      :allNums="allNums"
      :pageSize="pageSize"
      :pageChangeFn="pageChangeFn"
      :sizeChangeFn="sizeChangeFn"
    ></myPaging>
    <!-- 显示和添加题目 -->
    <el-dialog
      title="提示"
      :visible.sync="showQuestion"
      width="50%"
      :before-close="handleClose"
      :append-to-body="true"
    >
      <el-form label-width="80px">
        <el-button
          @click="dialogVisible = true"
          type="success"
          style="margin-bottom: 20px"
          >添加题目</el-button
        >
        <el-form-item label="作业名称">
          <el-input placeholder="请输入内容" v-model="name" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="desc"></el-input>
        </el-form-item>
        <el-form-item label="题目展示:">
          <template v-for="(tempObj, quesIndex) in getSmallQuestion">
            <el-form-item
              :key="quesIndex"
              :label="'题目' + (quesIndex + 1)"
              class="smallQuestionSty"
              style="margin-bottom: 15px"
            >
              <el-row>
                <el-col :span="22">
                  <el-card :body-style="{ padding: '0px' }">
                    <!-- 题干 -->
                    <el-form-item label="题干">
                      <div
                        v-html="JSON.parse(tempObj.questionContent).topicInfo"
                      ></div>
                    </el-form-item>
                    <!-- 选项 -->
                    <template
                      v-if="
                        JSON.parse(tempObj.questionContent).type != 4 &&
                        JSON.parse(tempObj.questionContent).type != 5
                      "
                    >
                      <el-form-item label="选项">
                        <template
                          v-for="(optionObj, optionIndex) in JSON.parse(
                            tempObj.questionContent
                          ).optionsInfo"
                        >
                          <el-form-item
                            :label="optionObj.options"
                            :key="optionIndex"
                          >
                            <div v-html="optionObj.value"></div>
                          </el-form-item>
                        </template>
                      </el-form-item>
                    </template>
                    <el-form-item label="答案">
                      <div v-html="tempObj.answer"></div>
                    </el-form-item>
                    <el-form-item label="解析">
                      <div v-html="tempObj.correct"></div>
                    </el-form-item>
                  </el-card>
                </el-col>
                <el-col :span="1"
                  ><el-button
                    type="text"
                    class="button"
                    @click="delSmallQuestion(quesIndex)"
                    >删除</el-button
                  ></el-col
                >
              </el-row>
            </el-form-item>
          </template>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showQuestion = false">取 消</el-button>
        <el-button type="primary" @click="submitFn">发布作业</el-button>
      </span>
    </el-dialog>
    <!-- 编辑题目 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      :append-to-body="true"
    >
      <el-form label-width="80px">
        <el-form-item label="题型:">
          <el-select v-model="questionType" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <template v-if="questionType == 1">
          <singleOption :cancelFn="cancelFn"></singleOption>
        </template>
        <template v-if="questionType == 2">
          <multiSelect :cancelFn="cancelFn"></multiSelect>
        </template>
        <template v-if="questionType == 3">
          <judgeQuestion :cancelFn="cancelFn"></judgeQuestion>
        </template>
        <template v-if="questionType == 4">
          <gapFilling :cancelFn="cancelFn"></gapFilling>
        </template>
        <template v-if="questionType == 5">
          <shortAnswer :cancelFn="cancelFn"></shortAnswer>
        </template>
      </el-form>
    </el-dialog>
    <!-- 发布为任务 -->
    <el-dialog
      title="提示"
      :visible.sync="taskYn"
      width="60%"
      :before-close="handleClose"
    >
      <el-form label-width="80px">
        <el-form-item label="课程">
          <el-select v-model="choiceCourse" multiple placeholder="请选择">
            <el-option
              v-for="(item, index) in gradeArr"
              :key="index"
              :label="item.courseName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务名称">
          <el-input v-model="taskName" placeholder="请输入名字"></el-input>
        </el-form-item>
        <el-form-item label="开始时间:">
          <el-date-picker
            v-model="startTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 100%"
            type="datetime"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间:">
          <el-date-picker
            v-model="endTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            style="width: 100%"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="taskYn = false">取 消</el-button>
        <el-button type="primary" @click="publishTaskSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import myPaging from "@/components/teacher/utilComponents/myPaging.vue";
import myList from "@/components/teacher/utilComponents/myList.vue";
import myTop from "@/components/teacher/utilComponents/myTop.vue";
// 单选
import singleOption from "@/components/teacher/allQuestion/singleOption";
// 多选
import multiSelect from "@/components/teacher/allQuestion/multiSelect";
// 判断
import judgeQuestion from "@/components/teacher/allQuestion/judgeQuestion";
// 填空
import gapFilling from "@/components/teacher/allQuestion/gapFilling";
// 简答
import shortAnswer from "@/components/teacher/allQuestion/shortAnswer";
import { Row, Col, Card, DatePicker } from "element-ui";
import {
  createHomework,
  getHomework,
  deleteHomework,
  publishTask,
  myCourse,
  addMessage,
} from "@/api/teacher";
export default {
  name: "operationList",
  components: {
    myPaging,
    myList,
    myTop,
    singleOption,
    multiSelect,
    judgeQuestion,
    gapFilling,
    shortAnswer,
    [Row.name]: Row,
    [Col.name]: Col,
    [Card.name]: Card,
    [DatePicker.name]: DatePicker,
  },
  data() {
    return {
      myTopConfiguration: {
        seletcInfoObjOne: {
          showName: "课程",
          type: "getAllCourse",
        },
        buttonInfo: {
          type: "success",
          clickFn: this.addFn,
        },
      },
      myListConfiguration: {
        allType: [
          {
            // dateType表示的是数据
            dateType: "id",
            // 数据显示的名字
            showName: "ID",
          },
          {
            dateType: "homeworkName",
            showName: "作业名称",
          },
          {
            dateType: "name",
            showName: "未作人数",
          },
          {
            dateType: "createTime",
            showName: "创建时间",
          },
        ],
        //   函数
        objFn: [
          {
            type: "",
            callFn: this.detailsFn,
            showInfo: "详情",
          },
          {
            type: "danger",
            callFn: this.deleteFn,
            showInfo: "删除",
          },
          {
            type: "success",
            callFn: this.publishTaskFn,
            showInfo: "发布为任务",
          },
        ],
        // 数据
        tableData: [],
      },
      //   分页所需数据
      nowPage: 1,
      pageSize: 10,
      allNums: 0,
      searchObj: null,
      dialogVisible: false,
      showQuestion: false,
      className: "",
      questionType: "1",
      desc: "",
      options: [
        {
          value: "1",
          label: "单选题",
        },
        {
          value: "2",
          label: "多选题",
        },
        {
          value: "3",
          label: "判断题",
        },
        {
          value: "4",
          label: "填空题",
        },
        {
          value: "5",
          label: "解答题",
        },
      ],
      name: "",
      startTime: "",
      endTime: "",
      courseId: "",
      homeworkId: "",
      taskYn: false,
      choiceCourse: [],
      gradeArr: [],
      taskName: "",
    };
  },
  computed: {
    getSmallQuestion() {
      return this.$store.state.teacher.questions;
    },
  },
  methods: {
    publishTaskFn(obj) {
      this.homeworkId = obj.id;
      this.taskYn = true;
    },
    publishTaskSubmit() {
      if (this.taskName.replace(/(^\s*)|(\s*$)/g, "") == "") {
        this.$message({
          message: "请输入任务名字",
          type: "warning",
        });
        return;
      }
      if (Date.parse(this.startTime) > Date.parse(this.endTime)) {
        this.$message({
          message: "结束时间不能先于开始时间",
          type: "warning",
        });
        return;
      }
      if (this.choiceCourse.length == 0) {
        this.$message({
          message: "请选择课程",
          type: "warning",
        });
        return;
      }
      let arr = [];
      let messageArr = [];
      for (let i = 0; i < this.choiceCourse.length; i++) {
        arr.push(
          publishTask({
            belongCourseId: this.choiceCourse[i],
            homeworkId: this.homeworkId,
            taskName: this.taskName,
            // 作业类型是1
            type: 1,
            beginTime: this.startTime,
            endTime: this.endTime,
          })
        );
        messageArr.push(
          addMessage({
            content: JSON.stringify({
              belongCourseId: this.choiceCourse[i],
              homeworkId: this.homeworkId,
              taskName: this.taskName,
              beginTime: this.startTime,
              endTime: this.endTime,
            }),
            courseId: this.choiceCourse[i],
            type: 3,
          })
        );
      }
      Promise.all(arr)
        .then(() => {
          this.choiceCourse = [];
          this.taskName = "";
          this.taskYn = false;
          return Promise.all(messageArr);
        })
        .then(() => {
          this.$message({
            message: "发布成功",
            type: "success",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    pageChangeFn(val) {
      this.nowPage = val;
      this.getHomeWorkInfo();
    },
    sizeChangeFn(val) {
      this.pageSize = val;
      this.getHomeWorkInfo();
    },
    deleteFn(obj) {
      console.log(obj);
      this.$confirm("确定要删除作业吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteHomework({
            homeworkId: obj.id,
          })
            .then(() => {
              if (
                this.myListConfiguration.tableData.length == 1 &&
                this.nowPage != 1
              ) {
                this.nowPage--;
              }
              this.getHomeWorkInfo();
              this.$message({
                type: "success",
                message: "已删除",
              });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    detailsFn(obj) {
      this.$router.push({
        path: "/doPaper",
        query: {
          hid: obj.id,
        },
      });
    },
    getAllGradeFn() {},
    submitFn() {
      // 判断值是否为空
      if (this.$store.state.teacher.questions.length == 0) {
        this.$message({
          message: "请添加问题",
          type: "warning",
        });
        return;
      }
      // 判断值是否为空值
      if (this.name.replace(/(^\s*)|(\s*$)/g, "") == "") {
        this.$message({
          message: "请输入作业名字",
          type: "warning",
        });
        return;
      }
      let obj = {
        answer: this.$store.state.teacher.answer,
        homeworkName: this.name,
        questionCount: this.$store.state.teacher.questions.length,
        question: this.$store.state.teacher.questions,
      };
      createHomework(obj)
        .then(() => {
          this.$message({
            message: "发布成功",
            type: "success",
          });
          this.$store.commit("teacher/CLEARALL");
          this.clearAll();
          this.dialogVisible = false;
          this.showQuestion = false;
          this.getInfo();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    clearAll() {
      this.name = "";
      this.desc = "";
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    addFn() {
      this.showQuestion = true;
    },
    delSmallQuestion(index) {
      console.log(index);
      this.$store.commit("teacher/DELSMALLQUEST", {
        index: index,
      });
    },
    cancelFn() {
      this.dialogVisible = false;
    },
    getInfo(id) {
      this.courseId = id;
      this.getHomeWorkInfo();
    },
    getHomeWorkInfo() {
      getHomework({
        beginIndex: this.nowPage,
        size: this.pageSize,
        courseId: this.courseId,
      })
        .then((result) => {
          this.allNums = result.data.total;
          this.myListConfiguration.tableData = result.data.records;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllCourse() {
      myCourse({})
        .then((result) => {
          this.gradeArr = result.data.records;
          this.value = this.gradeArr[0].id;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getAllCourse();
  },
};
</script>

<style>
</style>