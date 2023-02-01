// 引入路由
import IndexBase from '@/pages/student/IndexBase'
import IndexCourse from '@/pages/student/IndexCourse'
import ClassMembers from '@/pages/student/ClassMembers'
import CourseInfo from '@/components/student/CourseInfo/CourseInfo'
import UserTop from '@/components/student/UserTop'
import ClassSeed from '@/pages/student/ClassSeed'
import InboxPage from '@/pages/student/InboxPage'
import UserInfo from '@/components/student/UserInfo/UserInfo'
// 
export default [
    {
        path:'/user',
        component:UserTop,
        children:[
            {
                path: 'IndexBase',
                name: 'IndexBase',
                component: IndexBase,
                meta: {
                    title: "课程空间"
                },
            },
            {
                path: 'InboxPage',
                name: 'InboxPage',
                component: InboxPage,
                meta: {
                    title: "消息中心"
                },
            },
            {
                path: 'UserInfo',
                name: 'UserInfo',
                component: UserInfo,
                meta: {
                    title: "账号管理"
                },
            },
        ]
    },
    // {
    //     path: '/student/IndexBase',
    //     name: 'IndexBase',
    //     component: IndexBase,
    //     meta: {
    //         title: "课程空间"
    //     },
    // },
    {
        path:'/student',
        component:CourseInfo,
        children:[
            {
                path: 'IndexCourse',
                name: 'IndexCourse',
                component: IndexCourse,
                meta: {
                    title: "课程介绍"
                },
            },
            {
                path: 'ClassMembers',
                name: 'ClassMembers',
                component: ClassMembers,
                meta: {
                    title: "课程成员"
                },
            },
        ]
    },
    {
        path: '/ClassSeed',
        name: 'ClassSeed',
        component: ClassSeed,
        meta: {
            title: "课程直播"
        },
    },
]