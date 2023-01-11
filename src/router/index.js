import VueRouter from 'vue-router'
// 引入模块
import userZff from './user/zffUserRouter'
import userYxy from './user/yxyUserRouter'
import admin from './admin'
import teacher from './teacher'
const router = new VueRouter({
    routes: [
        ...userZff,
        ...userYxy,
        ...teacher,
        ...admin,
    ]
})
//全局前置路由守卫————初始化的时候、每次路由切换之前被调用
// 添加标题
router.afterEach((to) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
})
export default router