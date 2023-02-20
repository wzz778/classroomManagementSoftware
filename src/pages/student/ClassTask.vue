<template>
  <div>
    <div class="task" v-show="check == '任务'">
      <div class="taskTop">
        <span>{{ name }}</span>
      </div>
      <div class="state">
        <span>筛选</span>
        <el-radio v-model="radio" label="1"
          ><span @click="getTask" >作业</span></el-radio
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
              @click="notifysta(o.createTime)"
            >
              <div class="name">
                <img
                  :src="adatar ? adatar : require('@/assets/yxy/classPic.jpg')"
                />
              </div>
              <div class="name">
                <span> 签到</span>
                <span class="tasktime">开始时间：{{ o.createTime }}</span>
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
              @click="notify(o.id, o.time)"
            >
              <div class="name">
                <img
                  :src="adatar ? adatar : require('@/assets/yxy/classPic.jpg')"
                />
              </div>
              <div class="name">
                <span> 签到</span>
                <span class="tasktime">截至时间：{{ o.time }}</span>
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
              @click="notifyend(o.time)"
            >
              <div class="name">
                <img
                  :src="adatar ? adatar : require('@/assets/yxy/classPic.jpg')"
                />
              </div>
              <div class="name">
                <span> 签到</span>
                <span class="tasktime">截止时间：{{ o.time }}</span>
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
import { ZgetTask, ZgetOneCourse, ZgetSignRecords } from "@/api/user/index";
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
    //课程名字
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
    //改变状态跳转签到页面
    changeMsg(text, value) {
      this.check = value;
    },
    //根据作业决定跳转到浏览试卷页面还是做题页面
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
    //签到进行中：点击进入签到页面，并传递签到id
    notify: function (value, time) {
      this.check = "签到中";
      this.$refs.child.just(value, time);
    },
    //签到已结束：点击进入签到页面，并传递签到截止时间
    notifyend: function (value) {
      this.check = "签到结束";
      this.$refs.child.jtime(value);
    },
    //签到未开始：点击进入签到页面，并传递签到截止时间
    notifysta: function (value) {
      this.check = "签到未开始";
      this.$refs.child.jsta(value);
    },
    //日期转化
    getDate(value) {
      const date = value;
      var year = date.getFullYear();
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
       * */
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      // 拼接
      return year + "-" + month + "-" + day + " " + hours + ":" + minutes;
    },
    //获取作业
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
    //获取签到
    GetInfo() {
      this.saginend = [];
      this.saginnotStart = [];
      this.saginprogress = [];
      let da = {
        courseId: this.cid,
        nodePage: "1",
        pageSize: "1000",
      };
      ZgetSignRecords(da).then((result) => {
        if (result.msg == "OK") {
          if (result.data.total == 0) {
            this.$message.error("暂无数据");
          } else {
            for (let i = 0; i < result.data.records.length; i++) {
              let obje = result.data.records[i];
              let tim = this.getDate(new Date(result.data.records[i].endTime));
              obje["time"] = tim;
              if (new Date(result.data.records[i].createTime) > new Date()) {
                this.saginnotStart.push(obje);
              } else if (
                new Date(result.data.records[i].endTime) < new Date()
              ) {
                this.saginend.push(obje);
              } else {
                this.saginprogress.push(obje);
              }
            }
          }
        } else {
          this.$message.error("获取失败");
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