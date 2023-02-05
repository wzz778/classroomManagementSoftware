<template>
  <el-container>
    <el-main>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%; min-height: 300px"
        :cell-style="{ 'text-align': 'center' }"
        :header-cell-style="{
          'text-align': 'center',
          height: '80px',
          lineHeight: '40px',
          padding: 0,
        }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          label=""
          :cell-style="{ 'text-align': 'left' }"
          prop="fen"
          tableData
        >
          <template slot="header" slot-scope>
            <div class="nselect">
              <el-select
                v-model="valueid"
                ref="optionRef"
                placeholder="请选择"
                style="margin-right: 20px"
              >
                <el-option
                  v-for="item in lessons"
                  :key="item.valueid"
                  :label="item.label"
                  :value="item.valueid"
                >
                </el-option>
              </el-select>
              <el-select
                v-model="value"
                clearable
                placeholder="请选择"
                style="margin-right: 20px"
              >
                <el-option
                  v-for="item in types"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <div class="searchBtns">
                <el-button type="primary" plain @click="GetInfo"
                  >筛选</el-button
                >
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="课程名称" width="200" show-overflow-tooltip>
          {{ className }}
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="发布时间"
          width="280"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column width="200" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="showCheck(scope.row, 'Details')"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose"
      >
        <div class="dialogSty">
          {{ content }}
        </div>
        <div class="dialogOperator">
          <el-button @click="dialogVisible = false" type="">取消</el-button>
          <el-button
            v-show="type != 2 && type != 5"
            @click="dialogVisible = false"
            type=""
            >确认</el-button
          >
          <el-button v-show="type == 2" @click="news" type=""
            >查看问题</el-button
          >
          <el-button v-show="type == 5" @click="zhi" type=""
            >进入直播</el-button
          >
        </div>
      </el-dialog>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisibleNews"
        width="50%"
        :before-close="handleClose"
      >
        <div class="dialogSty">
          <el-form label-width="80px" v-show="state == '查看问题'">
            <el-form-item label="注意">
              <div>做答时间只有10分钟</div>
            </el-form-item>
            <el-form-item label="题干">
              <div v-html="topic.topicInfo"></div>
            </el-form-item>
            <el-form-item label="选项:">
              <template v-for="(item, index) in topic.optionsInfo">
                <el-form-item
                  :label="item.options"
                  :key="index"
                  label-width="50px"
                >
                  <div v-html="item.value"></div>
                </el-form-item>
              </template>
            </el-form-item>
            <el-form-item label="答案">
              <el-select
                v-model="answerk"
                clearable
                placeholder="请选择"
                style="margin-right: 20px"
              >
                <el-option
                  v-for="item in xuan"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-form label-width="120px" v-show="state == '问题失效'">
            <el-form-item label="答题已结束"> </el-form-item>
          </el-form>
        </div>
        <div class="dialogOperator">
          <el-button @click="dialogVisibleNews = false" type="">取消</el-button>
          <el-button
            @click="dialogVisibleNews = false"
            type=""
            v-show="state == '问题失效'"
            >确认</el-button
          >
          <el-button @click="zanswer" type="" v-show="state == '查看问题'"
            >提交</el-button
          >
        </div>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
import {
  Container,
  Header,
  Main,
  Table,
  TableColumn,
  Button,
  Radio,
} from "element-ui";
import {
  ZgetEntered,
  ZgetOneCourse,
  ZgetMessage,
  ZQuestion,
  ZAnswer,
} from "@/api/user/index";
export default {
  data() {
    return {
      //弹框
      dialogVisible: false,
      dialogVisibleNews: false,
      //多选框内容
      types: [
        {
          value: "1",
          label: "课程签到",
        },
        {
          value: "2",
          label: "课程通知",
        },
        {
          value: "3",
          label: "课程作业",
        },
        {
          value: "4",
          label: "分组通知",
        },
        {
          value: "5",
          label: "直播通知",
        },
      ],
      xuan: [
        {
          value: "A",
        },
        {
          value: "B",
        },
        {
          value: "C",
        },
        {
          value: "D",
        },
      ],
      value: "",
      type: "",
      lessons: [],
      valueid: "",
      className: "",
      tableData: [],
      sarr: [],
      multipleSelection: [],
      searchText: "",
      content: "",
      xijie: "",
      answerk: "",
      topic: "",
      state: "查看问题",
      timer: "",
      seconds: "600",
    };
  },
  props: ["change"],
  mounted: function () {
    this.Getclass();
  },
  watch: {
    change: {
      handler(newVal, oldVal) {
        console.info("value changed 1", newVal, oldVal);
        this.sarr = [];
        this.lessons = [];
        this.Getclass();
      },
      deep: true,
    },
  },
  methods: {
    showCheck(row, name) {
      this.dialogVisible = true;
      console.log("每行数据", row); // 获取当前行数据
      this.content = row.cont;
      this.xijie = row.content;
      this.type = row.type;
    },
    zhi() {
      this.dialogVisible = false;
      this.$router.push({
        path: "/watchLive",
        query: {
          id: this.xijie,
        },
      });
    },
    news() {
      this.seconds = "600";
      let data = {
        union: this.xijie,
      };
      ZQuestion(data).then((result) => {
        console.log("获取课堂问题", result);
        if (result.msg == "OK") {
          if (result.data) {
            var s = JSON.parse(result.data);
            this.topic = JSON.parse(s.question);
            this.state = "查看问题";
            this.dialogVisible = false;
            this.dialogVisibleNews = true;
            // this.Time();
          } else {
            //问题失效
            this.state = "问题失效";
            this.dialogVisible = false;
            this.dialogVisibleNews = true;
          }
        } else {
          this.$message.error("获取问题失败");
        }
      });
    },
    zanswer() {
      if (this.answerk) {
        let data = {
          union: this.xijie,
          answer: this.answerk,
        };
        ZAnswer(data).then((result) => {
          console.log("提交课堂问题", result);
          if (result.msg == "OK") {
            this.$message({
              type: "success",
              message: "成功提交答案",
            });
            this.dialogVisibleNews = false;
          }
        });
      } else {
        this.$message.error("请回答问题");
      }
    },
    Getclass() {
      let data = {
        nodePage: "1",
        pageSize: "1000",
      };
      ZgetEntered(data).then((response) => {
        if (response.msg == "OK") {
          this.sarr = response.data.records;
          for (let q = 0; q < response.data.records.length; q++) {
            this.getAllclass(this.sarr[q]);
            this.valueid = this.sarr[0].courseId;
          }
          this.GetInfo();
        } else {
          this.$message.error("暂无数据");
        }
      });
    },
    getAllclass(se) {
      let cid = {
        id: se.courseId,
      };
      ZgetOneCourse(cid).then((result) => {
        if (result.msg == "OK") {
          let obj = {};
          obj["valueid"] = result.data.id;
          obj["label"] = result.data.courseName;
          this.lessons.push(obj);
          this.className = this.lessons[0].label;
        } else {
          this.$message.error("暂无数据");
        }
      });
    },

    GetInfo() {
      this.tableData = [];
      this.className = this.$refs.optionRef.selected.label;
      let da = {
        courseId: this.valueid,
        nodePage: "1",
        pageSize: "1000",
        type: this.value,
      };
      ZgetMessage(da).then((result) => {
        console.log(result);
        if (result.msg == "OK") {
          for (let h = 0; h < result.data.length; h++) {
            var obje = result.data[h];
            let atype = "";
            let cont = "";
            if (result.data[h].type == 1) {
              atype = "课程签到";
              cont =
                "请注意：签到开始时间为：" +
                JSON.parse(result.data[h].content).createTime +
                "；结束时间为：" +
                JSON.parse(result.data[h].content).createTime +
                "。";
            } else if (result.data[h].type == 2) {
              atype = "课程通知";
              cont = "通知：请尽快查看问题并提交答案。";
            } else if (result.data[h].type == 3) {
              atype = "课程作业";
              cont = "各位同学好：老师新发布了一份作业，请按时完成。";
            } else if (result.data[h].type == 4) {
              atype = "分组通知";
              cont = "各位同学好：新的小组已经分配完成，请及时查看。";
            } else if (result.data[h].type == 5) {
              atype = "直播通知";
              cont = "请进入房间" + result.data[h].content + "进行学习。";
            }
            obje["fen"] = atype;
            obje["cont"] = cont;
            this.tableData.push(obje);
          }
        } else {
          this.$message.error("暂无数据");
        }
      });
    },
    //弹框
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
  components: {
    [Container.name]: Container,
    [Header.name]: Header,
    [Main.name]: Main,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Button.name]: Button,
    [Radio.name]: Radio,
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  // text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.msgInfo {
  display: flex;
  width: 100%;
  height: 70px;
  align-items: center;
  margin: 10px 0;
  background-color: #fff;
  justify-content: space-between;
}

.msg {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  .msgTitle {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    font-size: 15px;
    color: #666;
  }
  .msgPerson {
    display: inline-block;
    height: 25px;
    line-height: 25px;
    font-size: 13px;
  }
}
.msgDate {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin-right: 50px;
}
.nselect {
  display: flex;
}
.el-dialog__header {
  line-height: 30px;
  text-align: left;
}
.el-dialog::v-deep .el-dialog__body {
  line-height: 70px;
}
</style>