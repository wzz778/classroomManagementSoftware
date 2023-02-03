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
// 附件管理
import attachmentList from '@/pages/teacher/attachmentList'
// 作业详情
import jobDetails from '@/pages/teacher/jobDetails'
// 签到管理
import signDetails from '@/pages/teacher/signDetails'
// 成绩管理
import performanceManagement from '@/pages/teacher/performanceManagement'
// 讨论管理
import classroomDiscussion from '@/pages/teacher/classroomDiscussion'
// 讨论详情
import discussionDetails from '@/pages/teacher/discussionDetails'
// 分组管理
import classroomGroup from '@/pages/teacher/classroomGroup'
// 观看直播
import watchLive from '@/pages/teacher/watchLive'
// 任务管理
import taskManagement from '@/pages/teacher/taskManagement'
// 回答问题正确率
import ansQuestion from '@/pages/teacher/ansQuestion'
// 课程详情
import IndexCourse from '@/pages/student/IndexCourse'
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
            },
            {
                path: "attachmentList",
                component: attachmentList,
                meta: {
                    title: "附件管理"
                }
            },
            {
                path: "jobDetails",
                component: jobDetails,
                meta: {
                    title: "作业详情"
                }
            },
            {
                path: "signDetails",
                component: signDetails,
                meta: {
                    title: "签到管理"
                }
            },
            {
                path: "performanceManagement",
                component: performanceManagement,
                meta: {
                    title: "成绩管理"
                }
            },
            {
                path: "classroomDiscussion",
                component: classroomDiscussion,
                meta: {
                    title: "讨论管理"
                }
            },
            {
                path: "discussionDetails",
                component: discussionDetails,
                meta: {
                    title: "讨论管理"
                }
            },
            {
                path: "taskManagement",
                component: taskManagement,
                meta: {
                    title: "任务管理"
                }
            },
            {
                path: "ansQuestion",
                component: ansQuestion,
                meta: {
                    title: "回答问题详情"
                }
            },
            {
                path: "IndexCourse",
                component: IndexCourse,
                meta: {
                    title: "课程详情"
                }
            },
            {
                path:'classroomGroup',
                component:classroomGroup,
                meta:{
                    title:'分组管理'
                }
            }
        ]
    },
    {
        path: "/watchLive",
        component: watchLive,
        meta: {
            title: "观看直播"
        }
    }
]