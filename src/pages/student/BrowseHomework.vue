<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <div class="doResult">
        <span>得分：0/2</span>
        <span>耗时：5秒</span>
      </div>
      <div class="topicTab">
        <el-tag
          type="info"
          class="tagItem"
          v-for="(tag, index) in 30"
          :key="index"
          >{{ index + 1 }}</el-tag
        >
      </div>
    </el-aside>

    <el-container class="content">
      <el-header style="text-align: right; font-size: 12px" class="title">
        <h3 class="paperName">20200912卷</h3>
      </el-header>
      <el-main>
        <!-- 单选 判断-->
        <div class="topicPart">
          <div class="topicItem">
            <p>1.中华四大名著都有哪些，下列正确的是：</p>
            <div class="choiceItem">
              <el-radio-group v-model="radio">
                <el-radio disabled v-model="radio" label="选中且禁用">红楼梦</el-radio>
                <el-radio disabled v-model="radio" label="禁用">白楼梦</el-radio>
                <el-radio disabled v-model="radio" label="禁用">青楼梦</el-radio>
                <el-radio disabled v-model="radio" label="禁用">绿楼梦</el-radio>
              </el-radio-group>
            </div>
          </div>
          <!-- 填空 -->
          <div class="topicItem">
            <p>2.中华四大名著都有_、_、_、_哪些</p>
            <div class="blankItem">
              <div class="inputBlank">
                    <div
                      class="answerAreaBox"
                    ></div>
                  </div>
            </div>
          </div>
          <!-- 多选简答 -->
          <div class="topicItem">
            <p>3.中华四大名著都有哪些，下列正确的是：</p>
            <div class="choiceMoreItem">
              <!-- <el-checkbox-group v-model="checkList" @change="checkMore"> -->
                <el-checkbox v-model="checked1" disabled>红楼梦</el-checkbox>
                <el-checkbox v-model="checked2" disabled>西游记</el-checkbox>
                <el-checkbox v-model="checked1" disabled>三国演义</el-checkbox>
                <el-checkbox v-model="checked2" disabled>水浒传</el-checkbox>
                <!-- <el-checkbox
                  v-for="(f, index) in four"
                  :key="index"
                  :label="f"
                  >{{ f }}</el-checkbox
                > -->
              <!-- </el-checkbox-group> -->
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {
  Container,
  Main,
  Table,
  TableColumn,
  Header,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Aside,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Tag,
  Button,
  Input,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Backtop,
  Rate
} from "element-ui";
export default {
  name: "BrowseHomework",
  data() {
    return {
      input: "",
      radio: '选中且禁用',
      checkList: [],
      four: ["红楼梦", "西游记", "水浒传", "三国演义"],
      textarea: "",
      judge: "",
      difficulty: 3.5,
       checked1: false,
        checked2: true
    };
  },
  methods: {
    checkMore(val) {
      console.log(val);
    },
    judgeFun(val) {
      console.log(val);
    },
  },
  components: {
    [Container.name]: Container,
    [Main.name]: Main,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Header.name]: Header,
    [Dropdown.name]: Dropdown,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Aside.name]: Aside,
    [Menu.name]: Menu,
    [Submenu.name]: Submenu,
    [MenuItem.name]: MenuItem,
    [MenuItemGroup.name]: MenuItemGroup,
    [Tag.name]: Tag,
    [Button.name]: Button,
    [Input.name]: Input,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [CheckboxGroup.name]: CheckboxGroup,
    [Checkbox.name]: Checkbox,
    [Backtop.name]: Backtop,
    [Rate.name]:Rate
  },
};
</script>

<style lang="less" scoped>
html {
  overflow: hidden;
}
.el-header {
  background-color: #8bb4e9;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
  height: 99vh;
  overflow-y: auto;
  overflow-x: hidden;
  div {
    margin: 20px 0;
    width: 190px;
    margin-left: 10px;
  }
}

.content {
  display: flex;
  height: 99vh;
  flex-direction: column;
  overflow: hidden;
}

/* 整个滚动条 */
.content ::-webkit-scrollbar {
  /* 对应纵向滚动条的宽度 */
  width: 10px;
  /* 对应横向滚动条的宽度 */
  height: 10px;
}

/* 滚动条上的滚动滑块 */
.content ::-webkit-scrollbar-thumb {
  background-color: #49b1f5;
  border-radius: 32px;
}

/* 滚动条轨道 */
.content ::-webkit-scrollbar-track {
  background-color: #dbeffd;
  border-radius: 32px;
}

.el-main {
  overflow-y: auto;
  flex: 1;
}

.paperTitle {
  font-size: 17px;
  font-weight: 500;
}

.paperName {
  font-size: 18px;
  float: left;
}
.paperInfo {
  display: flex;
  height: 100%;
  font-size: 16px;
  color: #666;
  float: right;
  margin-top: 20px;
  span {
    display: inline-block;
    padding: 0 8px;
    height: 30px;
    line-height: 30px;
  }
}
.doResult {
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-left: 5%;
  border-top: 1px solid rgb(230, 230, 230);
  border-bottom: 1px solid rgb(230, 230, 230);
  font-size: 15px;
  color: #666;
  text-align: center;
  padding: 20px 0;
  span {
    margin: 10px 0;
  }
}
.btn {
  width: 100%;
  display: flex;
  justify-content: center;
}

.tagItem {
  width: 30px;
  height: 30px;
  text-align: center;
  margin: 6px;
  cursor: pointer;
}

//题目
.topicPartName {
  display: inline-block;
  width: auto;
  height: 50px;
  line-height: 50px;
  padding: 0 15px;
  background-color: cornflowerblue;
  border-radius: 5px;
  color: aliceblue;
}
.topicItem {
  padding: 35px 0;
}
.choiceItem,
.choiceMoreItem,
.shortAnswerItem {
  margin-top: 15px;
  margin-left: 20px;
}
.inputBlank {
  display: flex;
  align-items: center;
  margin: 15px 0;
  margin-left: 20px;
  .el-input {
    width: 150px;
  }
}
//答题结果
.result{
    display: flex;
    flex-direction: column;
    margin-left: 30px;
    margin-top: 20px;
    font-size: 16px;
    color: rgb(131, 131, 131);
    .resultItem{
        margin: 5px 0;
    }
    .el-rate{
        display: inline;
    }
}
.answerAreaBox {
  width: 90%;
  min-height: 60px;
  line-height: 30px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>