// 引入Vuex
import Vuex from 'vuex'
// 引入vue
import Vue from 'vue'
// 使用Vuex
Vue.use(Vuex)

// 引入模块化
import userZff from './user/zffStore'
import userYxy from './user/yxyStore'
import teacher from './teacher'
import admin from './admin'

// 准备actions(操作数据之前的操作)
const actions = {}
// 准备mutations(操作数据,键值一般大写)
const mutations = {
    GETTOKEN(state, val) {
        state.token = val
        localStorage.setItem('token', val)
    },
    DELTOKEN(state, val) {
        state.token = val
    }
}
// 准备state(存放数据)
const state = {
    token: localStorage.getItem('token') || ""
}
// 准备getters
const getters = {}

// 导出
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters,
    modules: {
        userZff,
        userYxy,
        admin,
        teacher
    }
})