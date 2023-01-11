// 引入路由
import layout from '@/components/teacher/layout'
// 我的课堂
import myClassroom from '@/pages/teacher/myClassroom'
// 班级管理
import classList from '@/pages/teacher/classList'
// 学生管理
import studentList from '@/pages/teacher/studentList'
// 作业管理(详情页面包括已交,未交，图表统计，作业内容)
import operationList from '@/pages/teacher/operationList'
// 
export default [
    {
        path: "/teacher",
        component: layout,
        children: [
            {
                path: "myClassroom",
                component: myClassroom,
                meta: {
                    title: "我的课堂"
                }
            },
            {
                path: "classList",
                component: classList,
                meta: {
                    title: "班级管理"
                }
            },
            {
                path: "studentList",
                component: studentList,
                meta: {
                    title: "学生管理"
                }
            },
            {
                path: "operationList",
                component: operationList,
                meta: {
                    title: "作业管理"
                }
            }
        ]
    }
]