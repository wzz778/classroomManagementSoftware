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
//添加课程
export const addCourse = async (data) => requests({url: "/course/addCourse",method: "POST",data})
//获取全部学科
export const getGrade = async (params) =>requests({url:'/grade/getGrade',method:'get',params});
//删除某班级
export const deleteGrade = async (params) => requests({url: "/grade/deleteGrade",method: "DELETE",params})
//添加班级
export const createGrade = async (params) => requests({url: "/grade/createGrade",method: "POST",params})
//更改封面
export const updateCover = async (data) => requests({url: "/course/updateCover",method: "PUT",data})