import VueRouter from 'vue-router'
// 引入模块
// import user from './user'
// import admin from './admin'
// import teacher from './teacher'
const router = new VueRouter({
    routes: [
        // ...user,
        // ...teacher,
        // ...admin,
        // {
        //     path:'/',
        //     component:Layout,
        // },

    ]
})
//全局前置路由守卫————初始化的时候、每次路由切换之前被调用
export default router