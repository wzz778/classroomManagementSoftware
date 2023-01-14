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