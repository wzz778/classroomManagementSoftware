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
    url: "/course/updateCover",
    method: "PUT",
    params: {
        id: data.id
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