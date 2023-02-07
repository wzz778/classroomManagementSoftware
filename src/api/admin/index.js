import requests from "../request.js";
//书写接口
//获取全部用户
export const getAllUser = async (params) =>requests({url:'/admin/getAllUser',method:'get',params});
//删除某用户
export const deleteUser = async (params) => requests({url: "/admin/deleteUser",method: "DELETE",params})
//重置某用户密码
export const resetPassword = async (params) => requests({url: "admin/resetPassword",method: "POST",params})
//更改某用户信息
export const updateUserInfo = async (params) => requests({url: "admin/updateUserInfo",method: "PUT",params})
//更改某用户权限
export const updatePower = async (params) => requests({url: "admin/updatePower",method: "PUT",params})
//获取全部学科
export const getHerCourse = async (params) =>requests({url:'/admin/getAllCourse',method:'get',params});
//删除某学科
export const deleteCourse = async (params) => requests({url: "/course/deleteCourse",method: "DELETE",params})
//获取个人创作的学科
export const myCourse = async (data) => requests({url: "/teacher/myCourse",method: 'GET',params: data})
//添加课程
export const addCourse = async (data) => requests({url: "/course/addCourse",method: "POST",data})
//获取全部课程
export const getGrade = async (params) =>requests({url:'/grade/getGrade',method:'get',params});
//获取该课堂的所有学生
export const courseStudents = async (params) =>requests({url:'/teacher/courseStudents',method:'get',params});
//删除某班级
export const deleteGrade = async (params) => requests({url: "/grade/deleteGrade",method: "DELETE",params})
//添加班级
export const createGrade = async (params) => requests({url: "/grade/createGrade",method: "POST",params})
//修改班级信息
export const updateGrade = async (params) => requests({url: "/grade/updateGrade",method: "PUT",params})
//更改封面
export const updateCover = async (data) => requests({url: "/course/updateCoverOrDetail",method: "PUT",data})
//添加话题
export const publishTopic = async (params) => requests({url: "/discuss/publishTopic",method: "POST",params})
//获取话题
export const getTopic = async (params) => requests({url: "/discuss/getTopic",method: "GET",params})
// //删除话题
export const deleteTopic = async (params) => requests({url: "/discuss/deleteTopic",method: "DELETE",params})
//添加评论
export const publishDiscuss = async (params) => requests({url: "/discuss/publishDiscuss",method: "POST",params})
//获取评论
export const getAllDiscuss = async (params) => requests({url: "/discuss/getAllDiscuss",method: "GET",params})
// //删除评论
export const deleteDiscuss = async (params) => requests({url: "/discuss/deleteDiscuss",method: "DELETE",params})
//分组
export const grouping = async (params) => requests({url: "/teacher/grouping",method: "GET",params})
//获取分组信息
export const groupInfo = async (params) => requests({url: "/chatGroup/groupInfo",method: "GET",params})