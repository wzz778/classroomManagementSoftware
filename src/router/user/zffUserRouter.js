// 引入路由
import IndexBase from '@/pages/student/IndexBase'
import IndexCourse from '@/pages/student/IndexCourse'
import ClassMembers from '@/pages/student/ClassMembers'
import CourseInfo from '@/components/student/CourseInfo/CourseInfo'
// 
export default [
    {
        path: '/student/IndexBase',
        name: 'IndexBase',
        component: IndexBase,
        meta: {
            title: "课程空间"
        },
    },
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
]