import requests from '../request'
export const addCourse = async (data) => requests({
    url: "/course/addCourse",
    method: "POST",
    data: data
})

export const myCourse = async (data) => requests({
    url: "/teacher/myCourse",
    method: 'GET',
    params: data
})

export const updateCover = async (data) => requests({
    url: "/course/updateCoverOrDetail",
    method: "PUT",
    params: {
        id: data.id,
        detail: data.detail
    },
    data: data.formdata
})

export const deleteCourse = async (data) => requests({
    url: "/course/deleteCourse",
    method: "DELETE",
    params: data
})

export const createHomework = async (data) => requests({
    url: "/homework/createHomework",
    method: "POST",
    data: data,
})

export const deleteGrade = async (data) => requests({
    url: "/grade/deleteGrade",
    method: "DELETE",
    params: data
})

export const getGrade = async (data) => requests({
    url: "/grade/getGrade",
    method: "GET",
    params: data
})

export const updateGrade = async (data) => requests({
    url: "/grade/updateGrade",
    method: "PUT",
    params: data
})

export const createGrade = async (data) => requests({
    url: "/grade/createGrade",
    method: "POST",
    params: data
})

export const courseStudents = async (data) => requests({
    url: "/teacher/courseStudents",
    method: "GET",
    params: data
})

export const deleteStudentFromCourse = async (data) => requests({
    url: "/teacher/deleteStudentFromCourse",
    method: "DELETE",
    params: data
})

export const signCourse = async (data) => requests({
    url: "/course/sign",
    method: "GET",
    params: data
})

export const getCourseSignInfo = async (data) => requests({
    url: "/teacher/getCourseSignInfo",
    method: "GET",
    params: data
})

export const getHomework = async (data) => requests({
    url: "/homework/getHomework",
    method: "GET",
    params: data
})
// 获取直播推流地址
export const createPushUrl = async () => requests({
    url: "/live/createPushUrl",
    method: 'POST'
})
// 获取直播拉流地址
export const createPlayUrl = async (data) => requests({
    url: "/live/createPlayUrl",
    method: 'POST',
    params: data
})

export const resetPassword = async (data) => requests({
    url: "/admin/resetPassword",
    method: 'POST',
    params: data
})

export const deleteHomework = async (data) => requests({
    url: "/homework/deleteHomework",
    method: "DELETE",
    params: data
})

export const uploadFile = async (data) => requests({
    url: "/teacher/uploadFile",
    method: "POST",
    data: data
})

export const getFiles = async (data) => requests({
    url: "/course/getFiles",
    method: "GET",
    params: data
})

export const publishTask = async (data) => requests({
    url: "/homework/publishTask",
    method: "POST",
    params: data
})

export const getTask = async (data) => requests({
    url: "/homework/getTask",
    method: "GET",
    params: data
})

export const randomName = async (data) => requests({
    url: "/teacher/randomName",
    method: "GET",
    params: data
})

export const addMessage = async (data) => requests({
    url: "/message/addMessage",
    method: "POST",
    params: data
})

// 发送弹幕
export const sendMessage = async (data) => requests({
    url: "/live/sendMessage",
    method: "POST",
    params: data
})

export const getTaskInfo = async (data) => requests({
    url: "/homework/getTaskInfo",
    method: "GET",
    params: data
})

export const publishQuestion = async (data) => requests({
    url: "/homework/publishQuestion",
    method: "POST",
    data: data.question,
    params: data.params
})

export const getOutcome = async () => requests({
    url: "/homework/getOutcome",
    method: "GET"
})

export const getMyPerformanceByUserId = async (data) => requests({
    url: "/user/getMyPerformanceByUserId",
    method: "GET",
    params: data
})

export const getTerm = async () => requests({
    url: "/user/getTerm",
    method: "GET"
})