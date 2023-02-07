<template>
  <div>
    <div class="task" v-show="check == '任务'">
      <div class="taskTop">
        <span>{{ name }}</span>
      </div>
      <div class="state">
        <span>筛选</span>
        <el-radio v-model="radio" label="1"
          ><span @click="getTask">作业</span></el-radio
        >
        <el-radio v-model="radio" label="2"
          ><span @click="GetInfo">签到</span></el-radio
        >
      </div>
      <div class="zuo01" v-show="radio == 1">
        <div class="taskState">
          <span>未开始({{ notStart.length }})</span>
        </div>
        <div class="zuo">
          <el-card class="box-card">
            <div v-for="o in notStart" :key="o.task.id" class="text item">
              <div class="name">
                <img
                  :src="adatar ? adatar : require('@/assets/yxy/classPic.jpg')"
                />
              </div>
              <div class="name">
                <span> {{ o.task.taskName }}</span>
                <span class="tasktime">开始时间：{{ o.task.beginTime }}</span>
              </div>
            </div>
          </el-card>
        </div>
        <div class="taskState">
          <span>进行中({{ progress.length }})</span>
        </div>
        <div class="zuo">
          <el-card class="box-card">
            <div
              v-for="o in progress"
              :key="o.task.id"
              class="text item"
              @click="jusp(o.task.homeworkId, o.sta, o.work)"
            >
              <div class="name">
                <img
                  :src="adatar ? adatar : require('@/assets/yxy/classPic.jpg')"
                />
              </div>
              <div class="name">
                <span> {{ o.task.taskName }}</span>
                <span class="tasktime">截至时间：{{ o.task.endTime }}</span>
              </div>
            </div>
          </el-card>
        </div>
        <div class="taskState">
          <span>已结束({{ end.length }})</span>
        </div>
        <div class="zuo">
          <el-card class="box-card">
            <div
              v-for="o in end"
              :key="o.task.id"
              class="text item"
              @click="jusp(o.task.homeworkId, o.sta, o.work)"
            >
              <div class="name">
                <img
                  :src="adatar ? adatar : require('@/assets/yxy/classPic.jpg')"
                />
              </div>
              <div class="name">
                <span> {{ o.task.taskName }}</span>
                <span class="tasktime">截止时间：{{ o.task.endTime }}</span>
              </div>
            </div>
          </el-card>
        </div>
      </div>
      <div class="zuo02" v-show="radio == 2">
        <div class="taskState">
          <span>未开始({{ saginnotStart.length }})</span>
        </div>
        <div class="zuo">
          <el-card class="box-card">
            <div
              v-for="o in saginnotStart"
              :key="o.id"
              class="text item"
              @click="check = '签到未开始'"
            >
              <div class="name">
                <img
                  :src="adatar ? adatar : require('@/assets/yxy/classPic.jpg')"
                />
              </div>
              <div class="name">
                <span> 签到</span>
                <span class="tasktime">开始时间：{{ o.time.createTime }}</span>
              </div>
            </div>
          </el-card>
        </div>
        <div class="taskState">
          <span>进行中({{ saginprogress.length }})</span>
        </div>
        <div class="zuo">
          <el-card class="box-card">
            <div
              v-for="o in saginprogress"
              :key="o.id"
              class="text item"
              @click="notify"
            >
              <div class="name">
                <img
                  :src="adatar ? adatar : require('@/assets/yxy/classPic.jpg')"
                />
              </div>
              <div class="name">
                <span> 签到</span>
                <span class="tasktime">截至时间：{{ o.time.endTime }}</span>
              </div>
            </div>
          </el-card>
        </div>
        <div class="taskState">
          <span>已结束({{ saginend.length }})</span>
        </div>
        <div class="zuo">
          <el-card class="box-card">
            <div
              v-for="o in saginend"
              :key="o.id"
              class="text item"
              @click="check = '签到结束'"
            >
              <div class="name">
                <img
                  :src="adatar ? adatar : require('@/assets/yxy/classPic.jpg')"
                />
              </div>
              <div class="name">
                <span> 签到</span>
                <span class="tasktime">截止时间：{{ o.time.endTime }}</span>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
    <div class="qian">
      <SignIn
        ref="child"
        v-show="check != '任务'"
        :check="check"
        @changeMsg="changeMsg"
      />
    </div>
  </div>
</template>

<script>
import { Card, Radio } from "element-ui";
import { ZgetTask, ZgetMessage, ZgetOneCourse } from "@/api/user/index";
import SignIn from "@/components/student/CourseInfo/SignIn";
export default {
  name: "ClassTask",
  data() {
    return {
      radio: "1",
      adatar: "",
      check: "任务",
      cid: this.$route.query.id,
      //任务状态分类数组
      notStart: [],
      progress: [],
      end: [],
      saginnotStart: [],
      saginprogress: [],
      saginend: [],
      name: "",
    };
  },
  components: {
    [Radio.name]: Radio,
    [Card.name]: Card,
    SignIn,
  },
  mounted: function () {
    this.getTask();
    this.getAllclass();
  },
  methods: {
    getAllclass() {
      let cid = {
        id: this.cid,
      };
      ZgetOneCourse(cid).then((result) => {
        if (result.msg == "OK") {
          this.name = result.data.courseName;
        }
      });
    },
    changeMsg(text, value) {
      this.check = value;
    },
    jusp(value, state, zuo) {
      this.check = "任务";
      if (state == "已结束") {
        this.$router.push({
          path: "/browseHomework",
          query: {
            hid: value,
          },
        });
      } else {
        if (zuo == "已提交") {
          this.$router.push({
            path: "/browseHomework",
            query: {
              hid: value,
            },
          });
        } else {
          this.$router.push({
            path: "/doPaper",
            query: {
              hid: value,
            },
          });
        }
      }
    },
    notify: function () {
      this.check = "签到中";
      this.$refs.child.just();
    },
    getTask() {
      this.end = [];
      this.notStart = [];
      this.progress = [];
      let data = {
        beginIndex: "1",
        courseId: this.cid,
        size: "1000",
      };
      ZgetTask(data).then((result) => {
        if (result.msg == "OK") {
          if (result.data.allCount == 0) {
            this.$message({
              type: "success",
              message: "暂无任务",
            });
          } else {
            for (let i = 0; i < result.data.list.length; i++) {
              if (new Date(result.data.list[i].task.beginTime) > new Date()) {
                let obj = result.data.list[i];
                obj["sta"] = "未开始";
                obj["work"] = "未提交";
                this.notStart.push(obj);
              } else if (
                new Date(result.data.list[i].task.endTime) < new Date()
              ) {
                let ob = result.data.list[i];
                ob["sta"] = "已结束";
                ob["work"] = "已提交";
                this.end.push(ob);
              } else {
                let obje = result.data.list[i];
                obje["sta"] = "进行中";
                if (result.data.list[i].userAnswer) {
                  obje["work"] = "已提交";
                } else {
                  obje["work"] = "未提交";
                }
                this.progress.push(obje);
              }
            }
          }
        } else {
          this.$message.error("暂无数据");
        }
      });
    },
    GetInfo() {
      this.saginend = [];
      this.saginnotStart = [];
      this.saginprogress = [];
      let da = {
        courseId: this.cid,
        nodePage: "1",
        pageSize: "1000",
        type: 1,
      };
      ZgetMessage(da).then((result) => {
        if (result.msg == "OK") {
          for (let i = 0; i < result.data.length; i++) {
            let obje = result.data[i];
            let time = JSON.parse(result.data[i].content);
            obje["time"] = time;
            if (new Date(time.createTime) > new Date()) {
              this.saginnotStart.push(obje);
            } else if (new Date(time.endTime) < new Date()) {
              this.saginend.push(obje);
            } else {
              this.saginprogress.push(obje);
            }
          }
        } else {
          this.$message.error("暂无数据");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.task {
  width: 95%;
  min-height: 450px;
  margin-bottom: 50px;
  background: white;
  border-radius: 8px;
  margin: 0 auto;
  padding-bottom: 20px;
  .taskTop {
    line-height: 50px;
    padding-left: 2em;
    border-bottom: 1.5px solid #3a39392b;
  }
  .taskState {
    line-height: 45px;
    padding-left: 2em;
    span {
      margin-right: 30px;
    }
  }
  .fen {
    height: 40px;
    line-height: 40px;
    padding-left: 2em;
  }
}
.text {
  font-size: 14px;
}

.item {
  padding-left: 1em;
  line-height: 54px;
  display: flex;
  border-bottom: 1px solid #3a39392b;
}
.item:hover {
  cursor: pointer;
}
.box-card {
  width: 100%;
}
.el-card.is-always-shadow {
  box-shadow: none;
}
.el-card {
  border: none;
  position: relative;
}
.name {
  height: 54px;
  line-height: 54px;
}
img {
  width: 40px;
  height: 40px;
  margin: 7px 15px 7px 0px;
}
.tasktime {
  position: absolute;
  right: 4%;
  color: rgb(139, 141, 143);
  font-size: 12px;
}
.el-card ::v-deep .el-card__body {
  padding-top: 0px;
}
.state {
  line-height: 45px;
  padding-left: 2em;
  span {
    margin-right: 30px;
  }
}
</style>