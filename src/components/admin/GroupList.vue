<template>
	<div class="GroupList">
        <div class='GroupTitle'>第{{this.groupIndex}}组</div>
        <div class='GroupStudent'>
            <div class="StudentBox" v-for="p of studentArr" :key="p.userName">
                <div style="height: 40px;">
                    <img :src="p.photo" alt="">
                </div>
                <div style="height: 20px;">{{p.name}}</div>
            </div>
        </div>
        <!-- {{jsonText}} -->
	</div>
</template>
<script>
	export default {
		name:'GroupList',
        data(){
            return{
                studentArr:[],
                groupName:""
            }
        },
		props:{
            jsonText: {
                type: String,
                default: "", //默认值,
            },
            groupIndex: {
                type: Number,
                default:1, //默认值,
            },
		},   
        created() {
            let arrdata=JSON.parse(this.jsonText)
            this.studentArr=arrdata.groupArr;
            this.groupName=arrdata.groupName;
        },
	}
</script>
<style lang="less" scoped>
    .GroupList{
        min-width: 600px;
        margin:10px 0px;
        .GroupTitle{
            height: 40px;
            line-height: 40px;
            background-color: white;
            box-shadow: 4px 4px 40px rgb(0 0 0 / 10%);
            border-radius:5px 5px 0 0;
            display: flex;
            padding-left:15px ;
            color: #474C59;
            justify-content:space-between;
            border:#BBC3CD 1px solid ;
            border-bottom:#589eff 1.5px solid ;
        }
        .GroupStudent{
            // height: 40px;
            // line-height: 40px;
            background-color: white;
            box-shadow: 4px 4px 40px rgb(0 0 0 / 10%);
            border-radius:0 0 5px 5px;
            display: flex;
            padding:10px ;
            color: #474C59;
            border:#BBC3CD 1px solid ;
            flex-wrap:wrap ;
            .StudentBox{
                width: 60px;
                height: 60px;
                // background-color: #BBC3CD;
                img{
                    width: 40px;
                    height: 40px;
                    border-radius: 100px; 
                }
                div{
                    width: 100%;
                    text-align: center;
                    line-height: 20px;
                    font-size: 14px;
                }
            }
        }
    }
</style>