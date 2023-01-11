<template>
  <div class="">
    <div class="addSty">
      <el-button @click="dialogVisible = true" type="success"
        >添加课程</el-button
      >
    </div>
    <div class="card">
      <div class="cardItem">
        <div class="cardImg">
          <div class="operator">
            <button class="delBtn">删除</button>
          </div>
          <img src="@/assets/01.jpg" alt="" />
        </div>
        <div class="cardInfo">
          <div class="infoText">
            <span>离散数学</span>
          </div>
          <div class="infoText">
            <span>xxx</span>
          </div>
          <div class="infoText">班级:<span>xxx</span></div>
        </div>
      </div>
      <div class="cardItem">
        <div class="cardImg">
          <div></div>
          <img src="@/assets/logo.png" alt="" />
        </div>
        <div class="cardInfo">
          <div class="infoText">
            <span>离散数学</span>
          </div>
          <div class="infoText">
            <span>xxx</span>
          </div>
          <div class="infoText">班级:<span>xxx</span></div>
        </div>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <div class="dialogSty">
        <el-form label-width="80px">
          <el-form-item label="课程名称">
            <el-input v-model="name" clearable></el-input>
          </el-form-item>
          <el-form-item label="上传图片">
            <el-upload
              class="upload-demo"
              ref="upload"
              action=""
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :on-change="handelChange"
              name="cover"
              :auto-upload="false"
            >
              <el-button slot="trigger" size="small" type="primary"
                >选取文件</el-button
              >
            </el-upload>
          </el-form-item>
          <el-form-item label="图片预览">
            <div class="cardImg" v-show="picSrc">
              <img :src="picSrc" alt="" />
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialogOperator">
        <el-button @click="handelSend" type="success">提交</el-button>
        <el-button @click="dialogVisible = false" type="">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Upload } from "element-ui";
export default {
  name: "myClassroom",
  data() {
    return {
      dialogVisible: false,
      fileList: [],
      picSrc: "",
      name: "",
    };
  },
  components: {
    [Upload.name]: Upload,
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    handelChange(file, fileList) {
      let f = new FileReader();
      f.readAsDataURL(file.raw);
      f.onload = () => {
        this.picSrc = f.result;
      };
      fileList = fileList.slice(-1);
      this.fileList = fileList;
      console.log("文件修改执行的函数", file, fileList);
    },
    handleRemove(file, fileList) {
      console.log("移除文件执行的函数", file, fileList);
      this.filesList = fileList;
      this.picSrc = "";
    },
    handlePreview(file) {
      console.log("点击已经上传的文件", file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      console.log("移除之前执行的函数", fileList);
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handelSend() {
      console.log("上传文件", this.fileList);
      //   这里需要判断一下文件大小或者类型
      //   自定义上传就需要我们使用fromdata对象来上传文件
      let formdata = new FormData();
      for (let i = 0; i < this.fileList.length; i++) {
        // 我们上传的文件保存在每个文件对象的raw里边
        formdata.append("file", this.fileList[i].raw);
      }
      //   添加其他属性
      // 发送请求
    },
  },
};
</script>

<style scoped>
.addSty {
  margin-bottom: 20px;
}

.card {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 30px;
  grid-row-gap: 30px;
}

.cardImg {
  position: relative;
  width: 240px;
  height: 130px;
  background-size: cover;
}

.cardImg > img {
  width: 100%;
  height: 100%;
}

.operator {
  display: none;
  position: absolute;
  background-color: white;
  padding: 5px 10px;
  right: 0px;
  opacity: 0.9;
}

.delBtn {
  background-color: white;
  border: none;
  cursor: pointer;
  color: red;
}

.cardItem:hover .operator {
  display: block;
  transform: 0.3s;
}

.dialogOperator {
  text-align: center;
}
</style>