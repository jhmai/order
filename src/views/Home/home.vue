<template>
    <div class="home">
        <searchbar></searchbar>
        <div class="main row" @mouseleave='hideCategory()'>
            <div class="category">
                <div class="line"></div>
                <ul class="category-list list-group">
                    <li class="list-group-item category-item" 
                     v-for="item in category" 
                     :key='item.id'
                      @mouseover='showCategory(item.id)' 
                      :class="[item.id==overId?'category-item-actice':'']">
                        <span>{{item.cate_name}}</span>
                        <i class="el-icon-arrow-right"></i>
                    </li>
                </ul> 
                
            </div>
            <div class="category-box" :class="[isshow?'show':'hidden']">
                <ul class="category-content">
                    <router-link v-for='item in categoryList' tag='li'  :to='"/productDetail/"+item.id' :key='item.id'>
                        <img :src="item.image">
                        <span>{{item.store_name}}</span>
                    </router-link>
                </ul>
            </div>
            <div class="banner">
                <img src="@/assets/images/banner.png">
                <!-- 二级分类 -->
                
            </div>
            <div class="news">
                <div class="news-title">
                    <span>最新消息(30)</span>
                    <span class="glyphicon glyphicon-refresh"></span>
                </div>
                <ul class="news-list list-group">
                    <li class="list-group-item news-item">
                        <p class="order-number">销售单：256156161561</p>
                        <div class="order-time">
                            <span>2020/12/11 9:20</span>
                            <span>待发货</span>
                        </div>
                    </li>
                    <li class="list-group-item news-item">
                        <p class="order-number">销售单：256156161561</p>
                        <div class="order-time">
                            <span>2020/12/11 9:20</span>
                            <span>待发货</span>
                        </div>
                    </li>
                    <li class="list-group-item news-item">
                        <p class="order-number">销售单：256156161561</p>
                        <div class="order-time">
                            <span>2020/12/11 9:20</span>
                            <span>待发货</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="product row">
            <div class="product-left col-md-2">
                <img src="@assets/images/moreimg.png">
            </div>
            <div class="product-right col-md-10">
                <ul class="product-list">
                    <li>
                        <img src="@assets/images/K01578074DAR.png">
                        <span class="product-name">xxx</span>
                    </li>
                    <li>
                        <img src="@assets/images/K01578074DAR.png">
                        <span class="product-name">xxx</span>
                    </li>

                </ul>
            </div>
        </div>
    </div>
</template>


<script>
import { getCategory } from '@/api/product'

export default {
    name: 'home',
    data(){
        return{
            isshow:false,
            category:[],
            categoryList:[],
            overId:''
        }
    },
    components: {
      
    },
    methods:{
        showCategory(id){
            this.isshow=true
            // console.log(id)
            this.overId=id;
            let index=this.category.findIndex(item=>{
                return item.id==id
            })
            this.categoryList=this.category[index].childrenByOneLevel
        },
        hideCategory(){
            this.isshow=false
            this.overId=''
        }
    },
    mounted(){
        getCategory().then(res=>{
            // console.log(res.data.data)
            this.category=res.data.data
        })
    }
}
</script>
<style lang="scss" scoped>
.show{
    display: block;
}
.hidden{
    display: none;
}
.home{
    width: 100%;
    padding: 0 15%;
}
.main{
    position: relative;
    display: flex;
    margin-top: 35px;
    width: 100%;
    height: 460px;
}
.category{
    position: relative;
    flex: 1;
    padding: 0;
    min-width: 150px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}
.line{
    width: 100%;
    height: 24px;
    background-color: #B41D28;
}
.category-list{
    flex: 1;
    flex-shrink: 0;
    overflow-y: scroll;
    border: 2px solid #B41D28;
}
.category-item{
    height: 44px;
    line-height: 44px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #6A6A6A;
    font-size: 14px;
    border: none;
    
}
.category-item:hover{
    cursor:pointer
}
.category-item>.glyphicon{
    color: #535353;
}
.banner{
    width: 70%;
    padding: 0;
    position: relative;
}
.banner>img{
    width: 100%;
    height: 100%;
}
.news{
    flex: 1;
    flex-shrink: 0;
    padding: 0;
    border: 1px solid #ccc;
    min-width: 150px;
}
.news-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 24px;
    background-color: #000;
    color: #B1B1B1;
    font-size: 14px;
    padding: 0 10px;
}
.news-title>.glyphicon{
    color: #fff;
}
.news-list>li{
    border: none;
}
.order-number{
    font-size: 12px;
    color: #333333;
    margin-bottom: 8px;
}
.order-time{
    width: 100%;
    color: #909399;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
}
.news-list>li:nth-child(2n-1){
    background-color: #ffffff
}
.news-list>li:nth-child(2n){
    background-color: #F4F5F7
}
.news-item{
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding:0 5px;
}
.category-box{
    position: absolute;
    width: 70%;
    height: 100%;
    border: 2px solid #A5242A;
    left: 15%;
    top: 0;
    padding: 20px;
    padding-right: 0;
    background-color: #fff;
    border-left: 0;
    z-index: 999;
    /*transform: translateX(100%);*/
    box-sizing: border-box;
}   
.category-content{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    overflow-y: scroll;
}
.category-content>li{
    width: 22%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 2%;
    margin-bottom: 25px;
    font-size: 18px;
    color: #535353;
}
.category-content>li:hover{
    cursor:pointer
}
.category-content>li>img{
    width: 100%;
    height: 90px;
    margin-bottom: 10px;
}
.category-item-actice{
    color:#fff;
    background-color: #B41D28;
}
.product{
    width: 100%;
    /*height: 322px;*/
    margin-top: 20px;
    display: flex;
}
.product-left{
    width: 18%;
    padding: 0;
    height: 100%;
}
.product-right{
    flex: 1;
    height: 100%;
    padding-right: 0;
    margin-right: 0;
}
.product-left>img{
    width: 100%;
    height: 100%;
}
.product-list{
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    margin-left: 20px;
}
.product-list>li{
    position: relative;
    width: 30%;
    margin-right: 1.5%;
    margin-bottom: 12px;
}

.product-list>li:nth-child(3n){
    margin-right: 0;
}
.product-list>li>img{
    width: 100%;
    height: 100%;
}
.product-list>li>span{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 32px;
    line-height: 32px;
    overflow: hidden;
    background-color: rgba(0,0,0,0.3);
    text-align: center;
    color: #fff;
    font-size: 15px;
    letter-spacing: 10px;
}
</style>
