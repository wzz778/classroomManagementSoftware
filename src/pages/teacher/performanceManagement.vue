<template>
  <div>
    <!-- 默认显示所有班的平均分，选择班级就显示一个班级的学生的分数 -->
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
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="性别:">
            <el-select v-model="sex" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="学生姓名:">
            <el-input
              v-model="studentName"
              placeholder="请输出查询姓名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <span style="margin-left: 30px"></span>
          <el-button type="success">确定</el-button>
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
  name: "performanceManagement",
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
      scope: [
        {
          value: 35,
          name: "未交(35)",
        },
        {
          value: 65,
          name: "已交(65)",
        },
      ],
    };
  },
  methods: {
    drawJobPeople() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("classPeople"));
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        title: {
          text: "平均分",
        },
        series: [
          {
            type: "pie",
            data: this.scope,
          },
        ],
      });
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
    editorFn(obj) {
      console.log(obj);
    },
  },
  mounted() {
    this.drawJobPeople();
  },
};
</script>

<style scoped>
#classPeople {
  margin: 0 auto;
}
</style>