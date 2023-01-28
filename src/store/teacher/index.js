// 准备actions(操作数据之前的操作)
const actions = {}
// 准备mutations(操作数据,键值一般大写)
const mutations = {
    ADDQUESTION(state, data) {
        state.questions.push(data.data)
        state.answer.push(data.answer)
    },
    DELSMALLQUEST(state, data) {
        state.questions.splice(data.index, 1)
    },
    CLEARALL(state) {
        state.questions = []
        state.answer = []
    }
}
// 准备state(存放数据)
const state = {
    questions: [],
    answer: []
}
// 准备getters
const getters = {}

// 导出
export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}