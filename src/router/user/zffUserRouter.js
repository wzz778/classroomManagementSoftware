// 引入路由
import IndexBase from '@/pages/user/IndexBase'
import IndexCourse from '@/pages/user/IndexCourse'
// 
export default [
    {
        path: '/IndexBase',
        name: 'IndexBase',
        component: IndexBase,
        meta: {
            title: "课程空间"
        },
    },
    {
        path: '/user/IndexCourse',
        name: 'IndexCourse',
        component: IndexCourse,
        meta: {
            title: "课程介绍"
        },
    },
]