<template>
	<div class="TitleBlock">
        {{text}}
	</div>
</template>
<script>
	export default {
		name:'TitleBlock',
		props:{
            text: {
                type: String,
                default: "标题", //默认值,
            },
            // text: {
            //     type: Object,
            // },
		},   
	}
</script>
<style lang="less" scoped>
    .TitleBlock{
        min-width: 600px;
        height: 40px;
        line-height: 40px;
        background-color: white;
        box-shadow: 4px 4px 40px rgb(0 0 0 / 10%);
        border-radius:5px 5px 0 0;
        display: flex;
        margin:5px 0px;
        padding-left:15px ;
        color: #474C59;
        cursor: pointer;
        justify-content:space-between;
        border:#BBC3CD 1px solid ;
        border-bottom:#589eff 2.5px solid ;
    }
</style>