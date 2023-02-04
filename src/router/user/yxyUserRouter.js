// 引入路由
import LoginPage from '@/pages/student/LoginPage'
import CourseInfo from '@/components/student/CourseInfo/CourseInfo'
import ClassTask from '@/pages/student/ClassTask'
import ClassWork from '@/pages/student/ClassWork'
import StudyGroup from '@/pages/student/StudyGroup'
import ClassDiscussion from '@/pages/teacher/classroomDiscussion'
import ShareData from '@/pages/student/ShareData'
import LearnDaily from '@/pages/student/LearnDaily'
// import ClassStudents from '@/pages/student/ClassStudents'
import IndexCourse from '@/pages/student/IndexCourse'
import DoPaper from '@/pages/student/DoPaper'
import UserInfo from '@/pages/student/UserInfo'
import ClassMembers from '@/pages/student/ClassMembers'
import InboxPage from '@/pages/student/InboxPage'
import GroupChat from '@/pages/student/GroupChat'
import CorrectHomework from '@/pages/student/CorrectHomework'
import BrowseHomework from '@/pages/student/BrowseHomework'
// 
export default [
    {
        path:'/login',
        component:LoginPage,
        meta: {
            title: "欢迎"
        },
    },
    {
        path:'/student',
        component:CourseInfo,
        children:[
            {
                path:'classTask',
                component:ClassTask,
                meta: {
                    title: "课程任务"
                },
            },
            {
                path:'ClassWork',
                component:ClassWork,
                meta: {
                    title: "课程作业"
                },
            },
            {
                path:'classDiscussion',
                component:ClassDiscussion,
                meta: {
                    title: "课程讨论"
                },
            },
            {
                path:'studyGroup',
                component:StudyGroup,
                meta: {
                    title: "我的小组"
                },
            },
            {
                path:'shareData',
                component:ShareData,
                meta: {
                    title: "共享资料"
                },
            },
            {
                path:'learnDaily',
                component:LearnDaily,
                meta: {
                    title: "学习情况"
                },
            },
            {
                path:'classStudents',
                component:ClassMembers,
                meta: {
                    title: "课程成员"
                },
            },
            {
                path: "discussionDetails",
                component: () => import('@/pages/teacher/discussionDetails'),
                meta: {
                    title: "话题回复"
                }
            },
            {
                path:'aboutClass',
                component:IndexCourse,
                meta: {
                    title: "关于课程"
                },
            },
            {
                path:'groupChat',
                component:GroupChat,
                meta: {
                    title: "小组讨论"
                },
            }
        ]
    },
    {
        path:'/doPaper',
        component:DoPaper,
        meta: {
            title: "做作业"
        },
    },
    {
        path:'/userInfo',
        component:UserInfo,
        meta: {
            title: "账号管理"
        },
    },
    {
        path:'/Inbox',
        component:InboxPage,
        meta: {
            title: "消息中心"
        },
    },
    {
        path:'/correctHomework',
        component:CorrectHomework,
        meta:{
            title:"批改作业"
        }
    },
    {
        path:'/browseHomework',
        component:BrowseHomework,
        meta:{
            title:"浏览作业"
        }
    }
]