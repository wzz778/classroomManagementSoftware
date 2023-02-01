<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="5" v-if="inputInfoObj">
        <el-form label-width="80px">
          <el-form-item :label="inputInfoObj.showName">
            <el-input
              v-model="value1"
              clearable
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="5" v-if="seletcInfoObjOne">
        <el-form label-width="80px">
          <el-form-item :label="seletcInfoObjOne.showName">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="(item, index) in gradeArr"
                :key="index"
                :label="item[getLabel]"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="5">
        <el-form label-width="80px">
          <el-button type="primary" v-if="inputInfoObj" @click="sureSerach"
            >查询</el-button
          >
          <template v-if="buttonInfo">
            <!-- 添加,buttonInfo的type是true的话是添加否则是导入 -->
            <el-button
              v-if="buttonInfo.type"
              type="success"
              @click="buttonInfo.clickFn"
              style="margin-bottom: 20px"
              >添加</el-button
            >
          </template>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Col, Row, Dropdown, DropdownMenu, DropdownItem } from "element-ui";
import { getGrade, myCourse } from "@/api/teacher";myCourse

export default {
  name: "myTop",
  /* 
  input对象
      是否显现,显现的名字
  select对象
      每个是否显现,显现的名字，显现的是啥，请求的接口名字
  */
  props: [
    "inputInfoObj",
    "searchFn",
    "buttonInfo",
    "seletcInfoObjOne",
    "getInfo",
  ],
  components: {
    [Col.name]: Col,
    [Row.name]: Row,
    [Option.name]: Option,
    [Dropdown.name]: Dropdown,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
  },
  data() {
    return {
      value: "",
      value1: "",
      gradeArr: [],
      timeer: null,
    };
  },
  computed: {
    getLabel() {
      return this.seletcInfoObjOne.type == "getAllGradeFn"
        ? "className"
        : "courseName";
    },
  },
  methods: {
    sureSerach() {
      let tempObj = {};
      this.searchFn(tempObj);
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
    getAllCourse() {
      myCourse({})
        .then((result) => {
          this.gradeArr = result.data.records;
          this.value = this.gradeArr[0].id;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAll() {
      if (this.seletcInfoObjOne) {
        this[this.seletcInfoObjOne.type]();
      }
    },
  },
  watch: {
    value(val) {
      if (this.timeer) {
        clearTimeout(this.timeer);
      }
      this.timeer = setTimeout(() => {
        this.getInfo(val);
      }, 500);
    },
  },
  mounted() {
    this.getAll();
  },
};
</script>

<style scoped>
.el-dropdown-menu {
  padding: 20px;
}

.el-dropdown {
  margin-left: 20px;
}
</style>