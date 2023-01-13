<template>
  <div>
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
    <!-- 签到，与未签 -->
    <div class="sign">
      <div class="signItem">
        <span>已签</span>
        <div class="signStudent">
          <div class="studentItem">
            <span class="studentInfo">
              <img src="@/assets/01.jpg" alt="" />
              <span>学生</span>
            </span>
            <button class="operatorBtn">删除</button>
          </div>
        </div>
      </div>
      <div class="signItem">
        <span>未签</span>
        <div class="signStudent">
          <div class="studentItem">
            <span class="studentInfo">
              <img src="@/assets/01.jpg" alt="" />
              <span>学生</span>
            </span>
            <button class="operatorBtn">补签</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Row, Col } from "element-ui";
export default {
  name: "signDetails",
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
  },
  data() {
    return {
      className: "",
      studentName: "",
    };
  },
};
</script>

<style scoped>
.sign {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.sign > div:first-child {
  border-right: 1px solid black;
}

.signItem {
  padding: 10px;
}

.signItem > span {
  text-align: center;
  display: block;
  width: 100%;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
}

.studentItem {
  display: flex;
  align-items: center;
  padding: 10px 0px;
}

.studentItem > button {
  border: none;
  background-color: #dcdfe6;
  font-size: 16px;
  margin-left: 30px;
  display: none;
  cursor: pointer;
}

.studentItem > button:hover {
  color: red;
}

.studentItem:hover {
  background-color: #dcdfe6;
}

.studentItem:hover > button {
  display: inline-block;
}

.studentInfo {
  display: inline-flex;
  align-items: center;
  margin-left: 50px;
}

.studentInfo > img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.studentInfo > span {
  margin-left: 20px;
}
</style>