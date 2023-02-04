<template>
	<div class="topicList">
        <div class="faTopicList">
            <div class="topicListleft">
                <div class="imgbox" >
                    <img :src="this.form.user.photo" alt="">
                </div>
                <div class="textbox" >
                    <div class="textboxTop">
                        <span class="userName">{{ this.form.user.name }}</span>
                        <span class="userIdentity">{{ this.form.user.identity|toidentity()}}</span>
                        <span class="comTime">{{ this.form.discuss.createTime}}</span>
                    </div>
                    <div class="textboxCon">
                        {{ this.form.discuss.content}}
                    </div>
                </div>
            </div>
            <div class="topicListright">
                <a href="javascript:;" v-if="deletePower" @click="deleteDiscuss(form.discuss.id)"><i class="el-icon-delete"></i></a>
                <a href="javascript:;" @click="addDiscuss"><i class="el-icon-chat-line-round"></i></a>
            </div>
        </div>
        <div class="sonTopicList" v-if="sonDiscuss.length!=0">
            <div class="reTitle">回复：</div>
            <!-- <span v-if="true">{{sonDiscuss}}</span> -->
            <div class="sonDiscussBox" >
                <div class="sonDiscussList" v-for="p of sonDiscuss" :key="p.discuss.id" >
                    <div class="topicListleft">
                        <div class="imgbox" >
                            <img :src="p.user.photo" alt="">
                        </div>
                        <div class="textbox" >
                            <div class="textboxTop">
                                <span class="userName">{{ p.user.name }}</span>
                                <span class="userIdentity">{{ p.user.identity|toidentity()}}</span>
                                <span class="comTime">{{ p.discuss.createTime}}</span>
                            </div>
                            <div class="textboxCon">
                                {{ p.discuss.content}}
                            </div>
                        </div>
                    </div>
                    <div class="topicListright">
                        <a href="javascript:;" v-if="deletePower||p.user.studentId==form.user.studentId" @click="deleteDiscuss(p.discuss.id)"><i class="el-icon-delete"></i></a>
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>
<script>
import jwtDecode from "jwt-decode";
import { deleteDiscuss } from "@/api/admin/index";
	export default {
		name:'DiscussList',
		data() {
			return {
                form: {},
                deletePower:false,
                sonDiscuss:[]
			}
		},
        methods:{
            deleteDiscuss(value){
                this.$confirm("确定要删除课程吗?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                .then(() => {
                    deleteDiscuss({ discussId: value}).then((result) => {
                        console.log(result);
                        if (result.status == 200) {
                        this.$message({
                            type: "success",
                            message: "删除成功!",
                        });
                        this.$store.commit("admin/deleteDiscuss", value);
                        } else {
                        this.$message({
                            type: "warning",
                            message: "操作失败",
                        });
                        }
                    });
                    })
                    .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
            },
            addDiscuss(){
                this.$store.commit("admin/setDiscussForm", this.jsonText);
            }
        },
		props:{
            jsonText: {
                type: String,
                default: "4543634", //默认值,
            },
            showmore: {
                type: Boolean,
                default:true, //默认值,
            },
		},
        filters:{
            toidentity(value){
                if(value==0){
                    return"学生"
                }else if(value==1){
                    return"老师"
                }else{
                    return"管理员"
                }
            }
        },
        created() {
            // console.log(jsonText);
            this.form = JSON.parse(this.jsonText);
            this.sonDiscuss=this.form.discussList;
            let obj = jwtDecode(window.localStorage.token)
            if(this.form.user.studentId==obj.id){
                this.deletePower=true
            }
        },        
	}
</script>
<style lang="less" scoped>
    .topicList{
        min-width: 600px;
        margin:5px 0px;
        .faTopicList{
            width: 100%;
            height: 80px;
            box-shadow: 4px 4px 40px rgb(0 0 0 / 10%);
            background-color: white;
            border-radius:5px ;
            display: flex;
            padding-left:5px ;
            cursor: pointer;
            justify-content:space-between;
            .topicListleft{
                min-width: 400px;
                height: 80px;
                padding:5px;
                display: flex;
                justify-content:space-between;
                .imgbox{
                    width: 40px;
                    height: 70px;
                    padding-top:10px;
                    img{
                        width: 40px;
                        height: 40px;
                        border-radius: 100px;
                    }
                }
                .textbox{
                    min-width: 400px;
                    height: 70px;
                    .textboxTop{
                        padding: 5px;
                        height: 25px;
                        width: 100%;
                        line-height: 25px;
                        color: #484848;
                        .userName{
                            font-size: 14px;
                            padding: 0 5px;
                        }
                        .comTime{
                            font-size: 12px;
                            padding: 0 5px;
                        }
                    }
                    .textboxCon{
                        height: 45px;
                        width: 100%;
                        padding: 0 10px;
                        line-height: 22px;
                        font-size: 15px;
                    }
                    .userIdentity{
                        border: #85bddd 1.5px solid;
                        background-color: #dff2ff;
                        display: inline-block;
                        color: #54a8da;
                        height: 19px;
                        line-height: 16px;
                        border-radius: 6px;
                        font-size: 12px;
                        padding: 0 5px;
                    }
                }
            }
            .topicListright{
                width: 80px;
                height: 80px;
                padding-top:50px;
                a{
                    padding: 0 5px;
                    font-size: 14px;
                    color: #aeaeae;
                    &:hover{
                         color: #5f5f5f;
                    }
                }
            }
            &:hover{
                background-color: #f8f8f8;
            }
        }
        .sonTopicList{
            width: 100%;
            min-height: 30px;
            background-color: #e6e6e6;
            border-radius:5px ;
            display: flex;
            .reTitle{
                height: 30px;
                width: 70px;
                padding-left:15px ;
            }
            .sonDiscussBox{
                width: 100%;
                .sonDiscussList{
                    padding: 0 10px;
                    width: 100%;
                    background-color: white;
                    height: 40px;
                    display: flex;
                    justify-content:space-between;
                    border-radius:5px;
                    margin:1px 0;
                    .topicListleft{
                        min-width: 400px;
                        height: 40px;
                        display: flex;
                        justify-content:space-between;
                        .imgbox{
                            width: 30px;
                            height: 30px;
                            padding-top:5px;
                            img{
                                width: 30px;
                                height: 30px;
                                border-radius: 100px;
                            }
                        }
                        .textbox{
                            min-width: 400px;
                            height: 30px;
                            .textboxTop{
                                padding: 2px;
                                height: 18px;
                                width: 100%;
                                line-height: 18px;
                                color: #484848;
                                .userName{
                                    font-size: 12px;
                                    padding: 0 5px;
                                }
                                .comTime{
                                    font-size: 10px;
                                    padding: 0 5px;
                                }
                            }
                            .textboxCon{
                                height: 25px;
                                width: 100%;
                                padding: 0 10px;
                                line-height: 22px;
                                font-size: 13px;
                            }
                            .userIdentity{
                                border: #85bddd 1.5px solid;
                                background-color: #dff2ff;
                                display: inline-block;
                                color: #54a8da;
                                height: 14px;
                                line-height: 11px;
                                border-radius: 6px;
                                font-size: 8px;
                                padding: 0 2px;
                            }
                        }
                    }
                    .topicListright{
                        width: 40px;
                        height: 40px;
                        padding-top:20px;
                        a{
                            padding: 0 2px;
                            font-size: 12px;
                            color: #aeaeae;
                            &:hover{
                                color: #5f5f5f;
                            }
                        }
                    }
                }
            }
        }
    }
</style>