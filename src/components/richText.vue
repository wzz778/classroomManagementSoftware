<template>
  <div>
    <button @click="dialogVisible = true">点击</button>
    <el-dialog
      @opened="createEditor()"
      title="提示"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose"
    >
      <div id="editor"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="sureFn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import E from "wangeditor";
import { Dialog } from "element-ui";
import AlertMenu from "@/myText/myRichText"; // 根据AlertMenu.js文件实际路径进行引入即可
import myStore from "@/store";
export default {
  name: "myText",
  components: {
    [Dialog.name]: Dialog,
  },
  data() {
    return {
      dialogVisible: false,
      editor: null,
      editorContent: "",
      value: "",
    };
  },
  methods: {
    createEditor() {
      this.editor = new E("#editor");
      this.editor.config.onchange = (html) => {
        this.value = html;
      };
      this.editor.config.menus = [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "list", // 列表
        "justify", // 对齐方式
        "quote", // 引用
        "emoticon", // 表情
        "image", // 插入图片
        "table", // 表格
        "code", // 插入代码
        "undo", // 撤销
        "redo", // 重复
      ];
      // 配置自定义按钮
      this.editor.menus.extend("alertMenu", AlertMenu); // 配置扩展的菜单
      this.editor.config.menus = this.editor.config.menus.concat("alertMenu");
      // 配置上传图片
      this.editor.config.uploadImgShowBase64 = true; // base 64 存储图片
      this.editor.config.uploadImgServer = "/api/homework/addPicture";
      // 配置服务器端地址(这里的this.$api.getJavaEndPoint()是自己定义的一个地址前缀)
      this.editor.config.uploadFileName = "file"; // 后端接受上传文件的参数名
      this.editor.config.uploadImgHeaders = {
        token: myStore.state.token, // 设置请求头
      };
      this.editor.config.uploadImgHooks = {
        fail: function () {
          this.$message({
            message: "图片上传失败",
            type: "warning",
          });
        },
        error: function () {
          this.$message.error("图片上传出错");
        },
        success: (xhr, editor, result) => {
          // 图片上传成功回调
          console.log("成功", result);
        },
        customInsert: (insertImg, result, editor) => {
          insertImg(result.data);
        },
      };
      this.editor.create();
      this.editor.cmd.do("insertHTML", this.oriHtml);
    },
    // 初始化
    init() {
      this.dialogVisible = true;
      return new Promise((resolve, resject) => {
        this.promiseResult = { resolve, resject };
      });
    },
    handleClose() {
      this.$confirm("确认要关闭吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.destruction();
        })
        .catch(() => {});
    },
    // 销毁
    destruction() {
      this.editor.destroy(true);
      this.editor = null;
      //   销毁实例
      this.dialogVisible = false;
      this.promiseResult.resject(this.orlHtml);
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    // 确定
    sureFn() {
      this.promiseResult.resolve(this.value);
      this.destruction();
    },
  },
};
</script>
