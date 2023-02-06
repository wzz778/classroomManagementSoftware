//引入二次封装的axios（带有请求、响应拦截器）
import requests from '../request';

//使用接口

//登录
export const toLogin =async(data)=>requests({
    url:'user/outLogin/login',
    method:'POST',
    params:data
})

//注册
export const register=async(data)=>requests({
    url:'user/outLogin/register',
    method:'POST',
    params:data
})

//获取验证码
export const getCode=async(data)=>requests({
    url:'user/logged/sendCode',
    method:'POST',
    params:data
})

export const forgetPassword=async(data)=>requests({
    url:'user/outLogin/forgetPassword',
    method:'PUT',
    params:data
})

export const logout=async()=>requests({
    url:'user/logged/logOut',
    method:'GET'
})

export const getAllAddress=async()=>requests({
    url:'user/allAddress',
    method:'GET'
})

export const getUserInfo=async()=>requests({
    url:'user/getUserInfo',
    method:'GET'
})

export const updatePhoto=async(data)=>requests({
    url:'user/updatePhoto',
    method:'PUT',
    data:data
})

export const updatePassword=async(data)=>requests({
    url:'user/updatePassword',
    method:'PUT',
    params:data
})

export const updateInfo=async(data)=>requests({
    url:'user/updateUserInfo',
    method:'PUT',
    params:data
})

// 通过id获取试卷
export const getHomeworkById=async(data)=>requests({
    url:'homework/getHomeworkById',
    method:'GET',
    params:data
})

//提交试卷
export const submitAnswer=async(data)=>requests({
    url:'homework/submitAnswer',
    method:'POST',
    data:data
})

export const submitCorrect=async(data)=>requests({
    url:"homework/correctHomework",
    method:'POST',
    data:data
})

export const getCourseInfo=async(data)=>requests({
    url:'course/getCourseInfo',
    method:'GET',
    params:data
})

export const getMembers=async(data)=>requests({
    url:'user/getGroupById',
    method:'GET',
    params:data
})

/**
 * 发送聊天
 */
export const sendMessage=async(data)=>requests({
    url:'chatGroup/sendMessage',
    method:'POST',
    params:data
})

export const addClass=async(data)=>requests({
    url:'grade/enterGrade',
    method:'POST',
    params:data
})

export const getHistoryChat=async(data)=>requests({
    url:'chatGroup/getHistory',
    method:'GET',
    params:data
})