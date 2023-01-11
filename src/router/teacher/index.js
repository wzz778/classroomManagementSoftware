// 引入路由
import layout from '@/components/teacher/layout'
// 班级管理
import classList from '@/pages/teacher/classList'
// 
export default [
    {
        path: "/teacher",
        component: layout,
        children: [
            {
                path: "classList",
                component: classList,
                meta: {
                    title: "班级管理"
                }
            }
        ]
    }
]