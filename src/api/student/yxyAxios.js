//引入二次封装的axios（带有请求、响应拦截器）
import requests from '../request';

//使用接口

//登录
export const toLogin =async(data)=>requests({
    url:'user/outLogin/login',
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