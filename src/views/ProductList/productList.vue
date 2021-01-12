<template>
    <div class="productList">
        <div class="main row">
           <div class="sort">
               <div class="sort-list">
                   <div>综合</div>
                   <div>新品</div>
                   <div>热销</div>
                   <div>价格</div>
               </div>
               <!-- <div class="product-num">125款产品</div> -->
           </div>
           <ul class="product-list">
                <router-link tag='li' v-for='(item,index) in productList'
                :to='"/productDetail/"+item.id' 
                class="product-list-item"  
                :key='index'>
                   <div class="product-img">
                       <img :src="'http://m.qlzxb.cn/newapp/get_img/name/'+item.store_name">
                       <div class="sell-num">销量{{item.sales}}</div>
                   </div>
                   <div class="product-info">
                       <div class="product-title">{{item.store_name}}</div>
                       <div class="product-price">{{item.price}}元</div>
                       <!-- <div class="user-option">
                           <div class="comment">用户评价(20)</div>
                           <div class="collect">
                                <div class="nocollect" style="display: none;">
                                    <img src="@/assets/images/collect.png">
                                    <span>收藏</span>
                                </div>
                                <div class="collected" style="display: none1">已收藏</div>
                           </div>
                       </div> -->
                   </div>
                </router-link>
           </ul>
           <div class="more-product" @click='loadMore'>显示更多</div>
        </div>
    </div>
</template>


<script>
import { getProducts } from '@/api/product'
export default {
    name: 'productList',
    data(){
        return{
            paramas:{
                sid:'',
                keyword:'',
                priceOrder:'',
                salesOrder:'',
                news:'',
                page:1,
                limit:20
            },
            productList:[]
            
        }
    },
    components: {
      
    },
    methods:{
        loadMore(){
            ++this.paramas.page;
            this.getProducts()
        },
        getProducts(){
            this.paramas.sid=this.$route.query.id;
            this.paramas.keyword=this.$route.query.keyword;
            getProducts(this.paramas).then(res=>{
                console.log(res.data.data)
                this.productList.push(...res.data.data)
           })
        }
    },
    mounted(){
        this.getProducts()
    },
    beforeRouteLeave (to,from,next){
        // console.log(1)

        if (to.name!='productDetail') {
            this.$store.commit('noKeepAlive','productList')
        }
        next()
    },

    watch: {
	  '$route' (to, from) { //监听路由是否变化
		  if(to.path==from.path&&to.query!= from.query){
              this.productList=[]
			  this.id = to.query.id;
			  this.getProducts();//重新加载数据
		  }
	  }
}
}
</script>
<style lang="scss" scoped>
.main{
    width: 100%;
    padding: 0 15%;
}
.status>div{
    display: flex;
    align-items: center;
}
.status img{
    width: 4px;
    height: 7px;
    margin: 0 8px;
}
.sort{
    width: 100%;
    padding: 0 1%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 18px;
}
.sort-list{
    display: flex;
    align-items: center;
}
.sort-list>div{
    padding: 0 15px;
    border-right: 1px solid #E5E5E5;
    font-size: 13px;
    color: #535353;
}
.sort-list>div:last-child{
    border-right: none;
}
.product-list{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
}
.product-list-item{
    width: 310px;
    height: 260px;
    margin-right: 15px;
    margin-bottom: 25px;
    box-shadow: 0 0 5px 5px #F5F5F5;
    cursor: pointer;
}
.sell-num{
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: #FFF7F0;
    font-size: 12px;
    color: #A5242A;
    text-align: center;
    line-height: 18px;
    padding: 2px 6px;
}
.product-img{
    width: 100%;
    height: 180px;
    position: relative;
}
.product-img>img{
    width: 100%;
    height: 100%;
}
.product-info{
    width: 100%;
    padding: 10px;
}
.product-info>div{
    text-align: left;
}
.product-title{
    margin: 3px 0 8px;
    font-size: 20px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical; 
}
.product-price{
    font-size: 15px;
    color: #A5242A;
    margin-bottom: 8px;
}
.user-option{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.comment{
    color: #757575;
    font-size: 13px;
}
.collect{
    width: 80px;
    line-height: 22px;
    color: #fff;
    font-size: 12px;
}
.nocollect{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #B0B0B0;
}
.nocollect>img{
    width: 10px;
    height: 9px;
    margin-right: 3px;
}
.collected{
    background-color: #A5242A;
    text-align: center;
}
.more-product{
    width: 100px;
    margin: 30px auto;
    text-align: center;
    color: #A5242A;
    font-size: 16px;
}
.more-product:hover{
cursor:pointer

}
</style>
