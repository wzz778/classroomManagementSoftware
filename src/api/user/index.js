import requests from "../request.js";
//加入课程（课程口令,已使用，不过在课程码不正确的时候出现服务器响应数据失败）
export const ZaddGrade= async (data) =>requests({
    url:'user/enterCourseByCode',
    method:'put',
    params:data,
});