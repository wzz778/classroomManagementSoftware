import requests from "../request.js";
//加入课程（课程口令,已使用）
export const ZaddGrade= async (data) =>requests({
    url:'user/enterCourseByCode',
    method:'put',
    params:data,
});
//查看课程的所有成员（已使用）
export const ZourseStudents= async (data) =>requests({
    url:'teacher/courseStudents',
    method:'get',
    params:data,
});
//获取加入过的所有课程（已使用）
export const ZgetEntered= async (data) =>requests({
    url:'user/getEnteredCourse',
    method:'get',
    params:data,
});
//获取课程的详细信息（已使用）
export const ZgetOneCourse= async (data) =>requests({
    url:'course/getOneCourse',
    method:'get',
    params:data,
});
//点击签到改变状态（已使用）
export const Zsign= async (data) =>requests({
    url:'user/sign',
    method:'post',
    params:data,
});
//获取签到状态（已使用）
export const ZwhetherSign= async (data) =>requests({
    url:'user/whetherSign',
    method:'get',
    params:data,
});
//获取单个课程任务（已使用）
export const ZgetTask= async (data) =>requests({
    url:'homework/getTask',
    method:'get',
    params:data,
});
//获取单个课程作业（已使用）
export const ZgetHomework= async (data) =>requests({
    url:'homework/getHomework',
    method:'get',
    params:data,
});
//获取教师信息（已使用）
export const ZgetTeacherInfo= async (data) =>requests({
    url:'user/getTeacherInfo',
    method:'get',
    params:data,
});
//获取课程消息信息（已使用）
export const ZgetMessage= async (data) =>requests({
    url:'message/getMessage',
    method:'get',
    params:data,
});
//获取用户信息（已使用）
export const ZgetUserInfo= async () =>requests({
    url:'user/getUserInfo',
    method:'get',
});
//退出登录（已使用）
export const ZlogOut= async () =>requests({
    url:'user/logged/logOut',
    method:'get',
});
//获取课堂问题（正在使用）
export const ZQuestion= async (data) =>requests({
    url:'homework/getCourseQuestion',
    method:'get',
    params:data,
});
//回答课堂问题（已使用）
export const ZAnswer= async (data) =>requests({
    url:'homework/publishAnswer',
    method:'post',
    params:data,
});