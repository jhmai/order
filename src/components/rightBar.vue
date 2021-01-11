<template>
    <div class="right-bar">
        <div>
            <img src="@/assets/images/service.png">
            <span>人工客服</span>
        </div>
        <router-link tag="div" to="/personal">
            <img src="@/assets/images/my.png">
            <span>个人中心</span>
        </router-link>
        <router-link tag="div" to="/cart">
            <img src="@/assets/images/shoppingcar2.png">
            <span>购物车</span>
        </router-link>
    </div>

</template>


<script>
  export default {
    name: 'rightBar',
    data(){
        return{
            input:''
        }
    },
    components: {
      
    }
  }
</script>
<style lang="scss" scoped>
.right-bar{
	position: fixed;
	right: 0;
	top: 40%;
	border: 1px solid #EEEEEE;
	border-right: none;
    background: #fff;
}
.right-bar>div{
	width: 100px;
	height: 100px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 14px;
	color: #9A9A9A;
	border-bottom: 1px solid #EEEEEE;
	cursor: pointer;
}
.right-bar>div>span{
	font-size: 14px;
	color: #9A9A9A;
}
.right-bar>div img{
	margin-bottom: 5px;
	width: 18px;
	height: 18px;
}
</style>
