<template>
	<div class="topicList">
        <div class="topicListleft">
            <div class="imgbox" >
                <img :src="headImg" alt="">
            </div>
            <div class="textbox" >
                <div class="textboxTop">
                    <span class="userName">{{title}}</span>
                    <span class="comTime">{{number}}</span>
                </div>
                <div class="textboxCon">
                    {{content}}
                </div>
            </div>
        </div>
        <div class="topicListright">
            <a href="javascript:;" @click="deleteTopic"><i class="el-icon-delete"></i></a>
            <a href="javascript:;"><i class="el-icon-chat-line-round"></i></a>
        </div>
	</div>
</template>
<script>
	export default {
		name:'TopicList',
		data() {
			return {

			}
		},
        methods:{
            deleteTopic(){
                console.log("0000");
                this.$emit('deleteTopic',999)
            }
        },
		props:{
			headImg:{
				type:String, //name的类型是字符串
                default:"https://online-examination-1311156839.cos.ap-nanjing.myqcloud.com/photo/20230114130755_-589934592.webp", //默认值,
			},
			number:{
				type:String,
                required:"4543634"
			},
			title:{
				type:String,
				required:"4543634"
			},
            content:{
				type:String,
				default:"4543634", //默认值,
			}
		}
	}
</script>
<style lang="less" scoped>
    .topicList{
        min-width: 600px;
        height: 80px;
        background-color: white;
        box-shadow: 4px 4px 40px rgb(0 0 0 / 10%);
        border-radius:5px ;
        display: flex;
        margin:5px 0px;
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
</style>