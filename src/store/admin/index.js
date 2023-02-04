import {Storage} from './storage';
// 准备actions(操作数据之前的操作)
const actions = {

}
// 准备mutations(操作数据,键值一般大写)
const mutations = {
    addTab(state,data){
        state.editableTabs = data;
        Storage.setEditableTabs(data);
    },
    setTabName(state,data){
        state.editableTabsValue = data;
        Storage.setEditableTabsValue(data);
    },
    deleteTopic(state,value){
        state.deleteTopicid=value;
    },
    deleteDiscuss(state,value){
        console.log(value);
        state.deleteDiscussid=value;
    },
    setDiscussForm(state,value){
        state.discussForm=value;
    },
    clearDiscussForm(state,value){
        state.discussForm='';
    }
}
// 准备state(存放数据)
const state = {
    editableTabs:Storage.getEditableTabs()|| [{title:'首页',name:'/admin/index'}],
    editableTabsValue:Storage.getEditableTabsValue() || '/admin/index',
    // allgrade:["一年级","二年级","三年级","四年级","五年级","六年级","初一","初二","初三","高一","高二","高三"]
    deleteTopicid:'',
    deleteDiscussid:'',
    discussForm:""
}
// 准备getters
const getters = {}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}