// 引入路由
import LoginPage from '@/pages/student/LoginPage'
import CourseInfo from '@/components/student/CourseInfo/CourseInfo'
import ClassTask from '@/pages/student/ClassTask'
import ClassWork from '@/pages/student/ClassWork'
import StudyGroup from '@/pages/student/StudyGroup'
import ClassDiscussion from '@/pages/student/ClassDiscussion'
import ShareData from '@/pages/student/ShareData'
import LearnDaily from '@/pages/student/LearnDaily'
// import ClassStudents from '@/pages/student/ClassStudents'
import IndexCourse from '@/pages/user/IndexCourse'
import DoPaper from '@/pages/student/DoPaper'
import UserInfo from '@/components/student/UserInfo/UserInfo'
import ClassMembers from '@/pages/user/ClassMembers'

// 
export default [
    {
        path:'/login',
        component:LoginPage
    },
    {
        path:'/student',
        component:CourseInfo,
        children:[
            {
                path:'classTask',
                component:ClassTask
            },
            {
                path:'ClassWork',
                component:ClassWork
            },
            {
                path:'classDiscussion',
                component:ClassDiscussion
            },
            {
                path:'studyGroup',
                component:StudyGroup
            },
            {
                path:'shareData',
                component:ShareData
            },
            {
                path:'learnDaily',
                component:LearnDaily
            },
            {
                path:'classStudents',
                component:ClassMembers
            },
            {
                path:'aboutClass',
                component:IndexCourse
            }
        ]
    },
    {
        path:'/doPaper',
        component:DoPaper
    },
    {
        path:'/userInfo',
        component:UserInfo
    }
]