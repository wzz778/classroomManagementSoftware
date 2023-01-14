// 引入组件
import myRichText from '../components/richText'
import Vue from 'vue'

// 创建组件构造函数
const richText = Vue.extend(myRichText)
// 注册全局组件
Vue.component('myRichText', richText)
// 创建函数(传入配置对象)
const richFn = function (options) {
    let tempObj = {}
    if (options) {
        tempObj = options
    }
    // 实例化对象
    const Instance = new richText({
        data: tempObj
    })
    // 挂载
    let vm = Instance.$mount()
    // 添加到body里边
    document.body.appendChild(vm.$el)
    return vm.init()
}
// 暴露
export default {
    install: (Vue) => {
        Vue.prototype.$myRichText = richFn // 挂到Vue的原型上使用
    }
}
