import Vue from 'vue'
import App from './App.vue'
// 引入路由
import VueRouter from 'vue-router'
// 引入less
import less from 'less'
//引入element(常用:图标,按钮,表单,输入框,选择框,表格,分页,弹窗提示.菜单)
import { MessageBox, Message, Icon, Button, Form, FormItem, Input, Select, Option, Table, TableColumn, Pagination, Dialog, Menu, MenuItem ,Submenu,Row,Col} from 'element-ui'

// 引入路由器
import router from './router/index'
//引入vuex配置文件
import store from './store'

// 引入自定义富文本
import myRichText from "./myText/index"


// 配置less
Vue.use(less)
//配置路由
Vue.use(VueRouter)
// 配置常用element-ui组件
Vue.use(Icon)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Menu)
Vue.use(MenuItem)
// 配置自定义富文本
Vue.use(myRichText)
Vue.use(Submenu)
Vue.use(Row)
Vue.use(Col)

//配置(可全局通过this调用)
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
Vue.prototype.$prompt = MessageBox.prompt

new Vue({
  render: h => h(App),
  //配置store
  store: store,
  beforeCreate() {
    //全局事件总线
    Vue.prototype.$bus = this
  },
  //配置路由
  router: router,
}).$mount('#app')