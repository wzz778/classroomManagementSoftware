<template>
  <div>
    <div class="fearch">
      <el-button @click="getInfo">刷新</el-button>
    </div>
    <el-row>
      <!-- <el-col :span="12">
        <div
          id="allPeople"
          class="chartItem"
          style="width: 600px; height: 350px"
        ></div>
      </el-col> -->
      <el-col :span="12">
        <div
          id="sexAccuracy"
          class="chartItem"
          style="width: 600px; height: 400px"
        ></div>
      </el-col>
      <el-col :span="12">
        <div
          id="classAccuracy"
          class="chartItem"
          style="width: 600px; height: 400px"
        ></div>
      </el-col>
    </el-row>
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
import { getCourseOutCome } from "@/api/teacher";
export default {
  name: "ansQuestion",
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
  },
  data() {
    return {
      sexAccuracyData: [
        {
          value: 35,
          name: "正确(35)",
        },
        {
          value: 65,
          name: "错误(65)",
        },
      ],
      classAccuracyData: [
        {
          value: 35,
          name: "正确(35)",
        },
        {
          value: 65,
          name: "错误(65)",
        },
      ],
      allPeopleChart: null,
      sexAccuracy: null,
      classAccuracy: null,
    };
  },
  methods: {
    change() {
      this.title.text = "测试";
      this.dataInfoAllPeople = [
        {
          value: 35,
          name: "未交(3511111)",
        },
        {
          value: 65,
          name: "已交(1165)",
        },
      ];

      this.draw();
    },
    drawJobPeople() {
      // 基于准备好的dom，初始化echarts实例
      //   this.allPeopleChart = echarts.init(document.getElementById("allPeople"));
      this.sexAccuracy = echarts.init(document.getElementById("sexAccuracy"));
      this.classAccuracy = echarts.init(
        document.getElementById("classAccuracy")
      );
    },
    drawSex() {
      this.sexAccuracy.setOption(
        {
          tooltip: {},
          title: {
            text: "男女正确人数",
          },
          series: [
            {
              type: "pie",
              data: this.sexAccuracyData,
            },
          ],
        },
        true
      );
    },
    drawClass() {
      this.classAccuracy.setOption(
        {
          tooltip: {},
          title: {
            text: "班级正确人数",
          },
          series: [
            {
              type: "pie",
              data: this.classAccuracyData,
            },
          ],
        },
        true
      );
    },
    getInfo() {
      getCourseOutCome({
        union: this.$route.query.id,
      }).then((result) => {
        this.sexAccuracyData = [
          {
            value: result.data.manCount,
            name: `男正确人数(${result.data.manCount})`,
          },
          {
            value: result.data.womanCount,
            name: `女正确人数(${result.data.womanCount})`,
          },
        ];
        let obj = [];
        for (let i in result.data.map) {
          obj.push({
            value: result.data.map[i],
            name: `${i}，正确人数(${result.data.map[i]})`,
          });
        }
        this.classAccuracyData = obj;
        this.drawSex();
        this.drawClass();
      });
    },
  },
  mounted() {
    this.drawJobPeople();
    this.getInfo();
  },
};
</script>

<style scoped>
.chartItem {
  margin: 0 auto;
}

.fearch {
  margin-bottom: 20px;
}
</style>