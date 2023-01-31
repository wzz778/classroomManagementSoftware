// 引入路由


export default [
    {
        path:'/admin',
        name:'Layout',
        component:() => import('@/components/admin/layout.vue'),
        meta:{
            title:"首页"
        },
        children:[ //通过children配置子级路由
            {
                path:'index', 
                component: () => import('@/pages/admin/Users/list.vue'),
                meta:{
                    title:"主页"
                }
            },
        ]
    },
    {
        path:'/admin/users',
        name:'Layout',
        component: () => import('@/components/admin/layout.vue'),
        meta:{
            title:"用户管理"
        },
        children:[ //通过children配置子级路由
            {
                path:'list', 
                component: () => import('@/pages/admin/Users/list.vue'),
                name:"UsersList",
                meta:{
                    title:"用户列表"
                }
            },
        ]
    },
    {
        path:'/admin/class',
        name:'Layout',
        component: () => import('@/components/admin/layout.vue'),
        meta:{
            title:"班级管理"
        },
        children:[
            {
                path:'list', 
                component: () => import('@/pages/admin/Class/list.vue'),
                name:"ClassList",
                meta:{
                    title:"班级列表"
                }
            },
            {
                path:'edit', 
                component: () => import('@/pages/admin/Class/edit.vue'),
                name:"ClassEdit",
                meta:{
                    title:"班级创编",
                }

            },
        ]
    },
    {
        path:'/admin/subject',
        name:'Layout',
        component: () => import('@/components/admin/layout.vue'),
        meta:{
            title:"课堂管理"
        },
        children:[
            {
                path:'list', 
                component: () => import('@/pages/admin/Subject/list.vue'),
                name:"SubjectList",
                meta:{
                    title:"课堂列表"
                }
            },
            {
                path:'edit', 
                component: () => import('@/pages/admin/Subject/edit.vue'),
                name:"SubjectEdit",
                meta:{
                    title:"课堂创编",
                }

            },
            {
                path:'userlist', 
                component: () => import('@/pages/admin/Subject/userlist.vue'),
                name:"SubjectUsersList",
                meta:{
                    title:"课堂人员",
                }

            },
        ]
    },
]