import VueRouter from 'vue-router'
// 引入解析工具
import jwtDecode from "jwt-decode";
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
let noTokenPages = ['/login', '/noPower', '/doPaper', '/ClassSeed', '/userInfo', '/Inbox', '/correctHomework', '/browseHomework', '/watchLive']
//全局前置路由守卫————初始化的时候、每次路由切换之前被调用
router.beforeEach((to, from, next) => {
    // 判断是否判断token
    if (noTokenPages.indexOf(to.path) == -1) {
        if (window.localStorage.token == "") {
            // 未登录
            next({
                path: "/login"
            })
            return
        }
        // 判断token是否有效
        let obj = jwtDecode(window.localStorage.token)
        // 判断是否时看直播页面
        if (to.path.indexOf('/watchLive') != -1) {
            next()
            return
        }
        // 判断权限
        if (obj.power == '0') {
            // 用户
            if (to.path.indexOf('/student') != -1 || to.path.indexOf('/user') != -1) {
                // 访问学生页面放行
                next()
            } else {
                // 访问其他人页面拦截
                next({
                    path: "/noPower"
                })
            }
            return
        }
        if (obj.power == '1') {
            // 教师
            if (to.path.indexOf('/teacher') != -1) {
                // 放行
                next()
            } else {
                // 访问其他人页面拦截
                next({
                    path: "/noPower"
                })
            }
            return
        }
        if (obj.power == '2') {
            console.log(obj.power);
            // 管理员
            if (to.path.indexOf('/admin') != -1) {
                // 放行
                next()
            } else {
                // 访问其他人页面拦截
                next({
                    path: "/noPower"
                })
            }
            return
        }
    } else {
        next()
    }
})
// 添加标题
router.afterEach((to) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
})
export default router