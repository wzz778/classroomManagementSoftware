//对于axios进行二次封装
import axios from "axios";

import nprogress from "nprogress";

import 'nprogress/nprogress.css'

//在当前模块中引入store
import store from '@/store';

let requests = axios.create({
  //基础路径
  baseURL: "/api",
  //请求不能超过5S
  timeout: 5000,
});

//请求拦截器----在项目中发请求（请求没有发出去）可以做一些事情
requests.interceptors.request.use((config) => {
  //需要携带token带给服务器
  if (store.state.token) {
    config.headers.token = store.state.token;
  }
  nprogress.start()
  return config;
});

//响应拦截器----当服务器手动请求之后，做出响应（相应成功）会执行的
requests.interceptors.response.use(
  (res) => {
    //相应成功做的事情
    nprogress.done()
    return res.data;
  },
  (err) => {
    // console.log(err);
    alert("服务器响应数据失败");
    return err
  }
);
//最终需要对外暴露（不对外暴露外面模块没办法使用）
//这里的代码是暴露一个axios实例
export default requests;
