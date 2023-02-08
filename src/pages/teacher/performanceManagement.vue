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
import { getOutcome } from "@/api/teacher";

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
  },
  data() {
    return {
      scope: [
        {
          value: 0,
          name: "没有成绩或有同学未提交作业",
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
          text: "最近一次作业平均分",
        },
        series: [
          {
            type: "pie",
            data: this.scope,
          },
        ],
      });
    },
    getInfo() {
      getOutcome()
        .then((result) => {
          if (result.status == 500 || result.data.length == 0) {
            this.drawJobPeople();
            return;
          }
          let obj = [];
          for (
            let i = 0;
            i < result.data[result.data.length - 1].avgData.length;
            i++
          ) {
            console.log(result.data[result.data.length - 1].avgData[i]);
            obj.push({
              value: result.data[result.data.length - 1].avgData[i].avg,
              name: `${
                result.data[result.data.length - 1].avgData[i].grade.className
              }(${result.data[result.data.length - 1].avgData[i].avg})`,
            });
          }
          this.scope = obj;
          this.drawJobPeople();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getInfo();
  },
};
</script>

<style scoped>
#classPeople {
  margin: 0 auto;
}
</style>