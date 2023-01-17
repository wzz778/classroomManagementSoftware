<template>
  <div class="memebers">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="el-icon-s-custom"></i><span>教师（4人）</span>
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        <div class="name">
          <img :src="aimg ? aimg : require('@/assets/bac01.jpeg')" />
        </div>
        <div class="name">{{ "教师 " + o }}</div>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="el-icon-user-solid"></i><span>学生({{ adatar }}人)</span>
      </div>
      <div v-for="o in tableData" :key="o.studentId" class="text item">
        <div class="name">
          <img :src="o.photo ? o.photo : require('@/assets/01.jpg')" />
        </div>
        <div class="name">{{ o.userName }}</div>
        <div class="creatTime">进班时间：{{o.createTime}}</div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { ZourseStudents } from "@/api/user/index";
import { Card } from "element-ui";
export default {
  name: "ClassMebers",
  data() {
    return {
      aimg: "",
      adatar: "",
      tableData: [],
    };
  },
  mounted: function () {
    this.Getstudent();
  },
  methods: {
    Getstudent() {
      let data = {
        classId: "2",
        nodePage: "1",
        pageSize: "1000",
      };
      ZourseStudents(data).then((result) => {
        console.log("取出学生", result);
        if (result.msg == "OK") {
          this.tableData = result.data.records;
          this.adatar = result.data.total;
        } else {
          this.$message.error("获取课程成员失败");
        }
      });
    },
  },
  components: {
    [Card.name]: Card,
  },
};
</script>

<style scoped>
.members {
  width: 100%;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
  line-height: 40px;
  display: flex;
  padding-left: 10px;
  border-bottom: 1px solid rgb(64 62 62 / 18%);
  position: relative;
}
.name {
  line-height: 40px;
  margin-left: 10px;
}
.creatTime {
  position: absolute;
  right: 3%;
  color: #8b8d8f;
  font-size: 12px;
  line-height: 40px;
  margin-top: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  width: 95%;
  margin: 30px auto;
}
img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
i {
  margin-right: 6px;
  color: rgb(21, 21, 169);
  font-size: 18px;
}
</style>