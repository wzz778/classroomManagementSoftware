<template>
  <div>
    <!-- 交过与为交的图表 -->
    <el-row>
      <el-col :span="24">
        <div class="charSty">
          <div id="classPeople" style="width: 600px; height: 400px"></div>
        </div>
      </el-col>
    </el-row>
    <!-- 显示作业内容 -->
    <div></div>
    <!-- 显示班级 -->
    <el-form label-width="80px">
      <el-row>
        <el-col :span="5">
          <el-form-item label="班级:">
            <el-select v-model="className" placeholder="请选择班级">
              <el-option
                v-for="(item, index) in gradeArr"
                :key="index"
                :label="item.className"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="性别:">
            <el-select v-model="sex" placeholder="请选择性别" clearable>
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="完成情况:">
            <el-select v-model="finishType" placeholder="请选择完成情况">
              <el-option label="已交" value="1"></el-option>
              <el-option label="未交" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <span style="margin-left: 30px"></span>
          <el-button type="success" @click="searchFn">确定</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- 显示具体名单 -->
    <div>
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
    </div>
  </div>
</template>

<script>
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, PieChart } from "echarts/charts";
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
} from "echarts/components";
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from "echarts/features";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";
import { Row, Col } from "element-ui";
import myPaging from "@/components/teacher/utilComponents/myPaging.vue";
import myList from "@/components/teacher/utilComponents/myList.vue";
import { getGrade, getTaskInfo } from "@/api/teacher";

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  PieChart,
]);

export default {
  name: "jobDetails",
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    myPaging,
    myList,
  },
  data() {
    return {
      className: "",
      sex: "",
      studentName: "",
      finishType: "1",
      myListConfiguration: {
        allType: [
          {
            // dateType表示的是数据
            dateType: "userName",
            // 数据显示的名字
            showName: "学号",
          },
          {
            dateType: "sex",
            showName: "性别",
          },
          {
            dateType: "nativePlace",
            showName: "籍贯",
          },
          {
            dateType: "email",
            showName: "邮箱",
          },
        ],
        //   函数
        objFn: [
          {
            type: "",
            callFn: this.detailsFn,
            showInfo: "详情",
          },
        ],
        // 数据
        tableData: [],
      },
      //   分页所需数据
      nowPage: 1,
      pageSize: 10,
      allNums: 0,
      gradeArr: [],
      myChart: null,
      allUserNumbers: 0,
    };
  },
  methods: {
    drawJobPeople() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(document.getElementById("classPeople"));
    },
    draw(allNumber, finishNumber) {
      // 绘制图表
      this.myChart.setOption(
        {
          tooltip: {},
          title: {
            text: "作业收缴情况",
          },
          series: [
            {
              type: "pie",
              data: [
                {
                  value: allNumber - finishNumber,
                  name: `未交${allNumber - finishNumber}`,
                },
                {
                  value: finishNumber,
                  name: `已交${finishNumber}`,
                },
              ],
            },
          ],
        },
        true
      );
    },
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
    detailsFn(obj) {
      this.$router.push({
        path: "/correctHomework",
        query: {
          hId: this.$route.query.homeworkId,
          stuId: obj.studentId,
        },
      });
    },
    getAllGradeFn() {
      getGrade({
        beginIndex: 1,
        size: 1,
      })
        .then((result) => {
          return getGrade({
            beginIndex: 1,
            size: result.data.total,
          });
        })
        .then((result) => {
          this.gradeArr = result.data.records;
          this.value = this.gradeArr[0].id;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDetalisInfo() {
      return getTaskInfo({
        beginIndex: this.nowPage,
        size: this.pageSize,
        taskId: this.$route.query.id,
        status: 1,
      });
    },
    getInfo() {
      getTaskInfo({
        beginIndex: this.nowPage,
        size: this.pageSize,
        taskId: this.$route.query.id,
      })
        .then((result) => {
          console.log(result);
          this.allUserNumbers = result.data.allCount;
          return this.getDetalisInfo();
        })
        .then((result) => {
          this.draw(this.allUserNumbers, result.data.allCount);
        });
    },
    searchFn() {
      let obj = {
        beginIndex: this.nowPage,
        size: this.pageSize,
        taskId: this.$route.query.id,
        status: this.finishType,
      };
      if (this.className != "") {
        obj.gradeId = this.className;
      }
      if (this.sex != "") {
        obj.sex = this.sex;
      }
      getTaskInfo(obj).then((result) => {
        this.allNums = result.data.allCount;
        this.myListConfiguration.tableData = result.data.list;
      });
    },
  },
  mounted() {
    this.getAllGradeFn();
    this.drawJobPeople();
    this.getInfo();
    this.searchFn();
  },
};
</script>

<style scoped>
#classPeople {
  margin: 0 auto;
}
</style>