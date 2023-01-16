<template>
  <div>
    <myTop
      :inputInfoObj="myTopConfiguration.inputInfoObj"
      :searchFn="searchFn"
      :buttonInfo="myTopConfiguration.buttonInfo"
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
import { Row, Col, Card } from "element-ui";
import { createHomework } from "@/api/teacher";
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
  },
  data() {
    return {
      myTopConfiguration: {
        inputInfoObj: {
          showName: "班级名称:",
          transferName: "name",
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
            dateType: "grade",
            showName: "班级名称",
          },
          {
            dateType: "code",
            showName: "班级口令",
          },
          {
            dateType: "name",
            showName: "班级人数",
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
            callFn: this.editorFn,
            showInfo: "编辑",
          },
          {
            type: "danger",
            callFn: this.deleteFn,
            showInfo: "删除",
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
    };
  },
  computed: {
    getSmallQuestion() {
      return this.$store.state.teacher.questions;
    },
  },
  methods: {
    pageChangeFn(val) {
      this.nowPage = val;
    },
    sizeChangeFn(val) {
      this.pageSize = val;
    },
    deleteFn(obj) {
      console.log(obj);
      this.$confirm("确定要删除班级吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {})
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    editorFn(obj) {
      console.log(obj);
    },
    searchFn(obj) {
      this.searchObj = obj;
    },
    getAllGradeFn() {},
    submitFn() {
      // 判断值是否为空
      console.log(
        this.$store.state.teacher.questions,
        this.$store.state.teacher.answer
      );
      let obj = {
        answer: this.$store.state.teacher.answer,
      };
      createHomework(obj)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
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
  },
  mounted() {},
};
</script>

<style>
</style>