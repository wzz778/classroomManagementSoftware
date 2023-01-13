// 引入路由
import IndexBase from '@/pages/user/IndexBase'
import IndexCourse from '@/pages/user/IndexCourse'
import ClassMembers from '@/pages/user/ClassMembers'
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
    {
        path: '/user/ClassMembers',
        name: 'ClassMembers',
        component: ClassMembers,
        meta: {
            title: "课程成员"
        },
    },
]