import requests from "../request.js";
//书写接口
//获取全部用户
export const getAllUser = async (params) =>requests({url:'/admin/getAllUser',method:'get',params});
//删除某用户
export const deleteUser = async (params) => requests({url: "/admin/deleteUser",method: "DELETE",params})
//获取全部学科
export const getHerCourse = async (params) =>requests({url:'/admin/getAllCourse',method:'get',params});
//删除某学科
export const deleteCourse = async (params) => requests({url: "/course/deleteCourse",method: "DELETE",params})