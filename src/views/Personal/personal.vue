<template>
    <div class="personal">
       <div class="main row">
           <div class="user-menu">
               <div class="person-user">
                   <img src="@/assets/images/my.png">
                   <div class="userinfo">
                       <span class="username">{{userInfo.real_name}}</span>
                       <span class="duty">管理员</span>
                   </div>
                   <div class="userId">id:<span></span></div>
                   <div class="viptime">VIP会员有效期：<span></span></div>
               </div>
               <div class="account-setting setting">
                   <span>账户设置</span>
                   <ul>
                       <li>个人信息</li>
                       <li>收款地址</li>
                       <li>商家配置</li>
                       <li>账户余额</li>
                   </ul>
               </div>
               <div class="order-setting setting">
                   <span>需求订单</span>
                   <ul>
                       <li>待提交</li>
                       <li>已提交</li>
                       <li>待评估</li>
                       <li>已完成</li>
                   </ul>
               </div>
           </div>
           <div class="menu-content">
               <div class="content-item">
                   <div class="order-need">
                       <div class="order-num">
                           需求订单( <span>{{orderList.length}}</span>)
                       </div>
                       <!-- <div class="input-group">
                          <input type="text" class="form-control search-input" placeholder="请输入订单编号">
                          <span class="input-group-btn">
                            <div class="btn search-btn"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></div>
                          </span>
                        </div> -->
                   </div>
                   <div class="order-menu">
                        <el-row>
                            <el-col :span="4">
                                <div>近三个月订单</div>
                            </el-col>
                            <el-col :span="4">
                                <div>商品详情</div>
                            </el-col>
                            <el-col :span="2">
                                <div>单价(元)</div>
                            </el-col>
                            <el-col :span="2">
                                <div>数量</div>
                            </el-col>
                            <el-col :span="4">
                                <div>金额</div>
                            </el-col>
                            <el-col :span="8">
                                <div>订单状态</div>
                            </el-col>
                            <!-- <div class="col-md-2">近三个月订单</div>
                            <div class="col-md-2">商品详情</div>
                            <div class="col-md-1">单价(元)</div>
                            <div class="col-md-1">数量</div>
                            <div class="col-md-2">金额</div>
                            <div class="col-md-4">订单状态</div> -->
                            <!-- <div class="col-md-2">操作</div> -->
                       </el-row>
                   </div>

                   <ul class="order-list">
                       <li v-for='item in orderList'>
                           <div class="order-header">
                               <div class="order-detail">需求订单：<span>订单详情</span></div>
                               <div>订单号：<span>{{item.order_id}}</span></div>
                               <div>创建时间：<span>{{item._add_time}}</span></div>
                           </div>
                           <div class="order-content">
                                <el-row>
                                    <el-col :span="12">
                                        <ul class="product-list">
                                           <li class="product-item" v-for='product in item.cartInfo'>
                                                <el-row>
                                                    <el-col class="product-desc" :span="16">
                                                        <img 
                                                        :src="'http://m.qlzxb.cn/newapp/get_img/name/'+product.productInfo.store_name">
                                                        <p class="product-info">
                                                        {{product.productInfo.store_name}} 
                                                        {{product.productInfo.attrInfo&&product.productInfo.attrInfo.suk}}</p>
                                                    </el-col>
                                                    <el-col class="total-price" :span="4">{{product.truePrice}}元</el-col>
                                                    <el-col :span="4">2</el-col>
                                                </el-row>
                                           </li>
                                       </ul>
                                    </el-col>
                                    <el-col :span="4">
                                        <div class="order-total center">
                                           <span>{{item.total_price}}元</span>
                                           <span>支付方式：现金</span>
                                       </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div class="order-status center">
                                           <span class="red">
                                                <span>{{item._status._title}}</span>
                                                <!-- <span class="last-time">00:13:39</span> -->
                                            </span>
                                           <!-- <span>15分钟后订单 <br/> 将自动取消</span> -->
                                       </div>
                                    </el-col>
                                   <!--  <el-col :span="4">
                                        <div class="order-status col-md-2 center">
                                           <div class="tocommit">去提交</div>
                                           <span class="again">再次购买商品</span>
                                       </div>
                                    </el-col> -->
                                   
                                   
                                   
                                   
                               </el-row>
                           </div>

                       </li>

                   </ul>
               </div>
           </div>
            
        </div>
    </div>
</template>


<script>
import {getOrderList} from '@/api/order'
export default {
    name: 'personal',
    data(){
        return{
            orderList:[]
        }
    },
    methods:{
        getOrderList(){
            getOrderList({
                type:0,
                page:1,
                limit:999
            }).then(res=>{
                this.orderList=res.data.data
            })
        }
    },
    components: {
      
    },
    mounted(){
        this.getOrderList()
    },
    computed:{
        userInfo(){
            return this.$store.getters.userInfo
        }
    }
}
</script>
<style lang="scss" scoped>
.personal{
    min-height: 100%;
}
.main{
    display: flex;
    align-items: flex-start;
    height: 100%;
    padding: 30px 15% 0;
    background-color: #F5F5F5;
}
.user-menu{
    width: 230px;
    background-color: #fff;
    padding: 30px 20px;
}
.person-user{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #eee;
}
.person-user>img{
    width: 76px;
    height: 76px;
    border-radius: 50px;
}
.userinfo{
    margin: 20px 0 10px;
    display: flex;
    align-items: center;
}
.userinfo .username{
    font-size: 18px;
    margin-right: 13px;
}
.userinfo .duty{
    font-size: 14px;
    color: #084AFB;
    background-color: rgba(97, 124, 249, .1);
    padding: 2px 6px;
    display: block;
}
.userId{
    font-size: 16px;
    margin-bottom: 4px;
}
.viptime{
    color: #535353;
    font-size: 14px;
}
.setting{
    margin-top: 35px;
}
.setting>span{
    font-size: 16px;
    display: block;
    margin-bottom: 10px;
}
.setting>ul{
    font-size: 14px;
    color: #535353;
}
.setting>ul>li{
    margin-bottom: 6px;
    cursor: pointer;
}
.menu-content{
    flex: 1;
    margin-left: 25px;
}
.content-item{
    width: 100%;
}
.order-need{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 70px;
    background-color: #fff;
    padding: 0 33px;
    border-radius: 8px;
}
.order-num{
    font-size: 20px;
}
.order-need .input-group{
    height: 40px;
}
.order-need .input-group input{
    height: 40px;
    border:  1px solid #ccc;
}
.form-control{
    border:1px solid #ccc;
    box-sizing: border-box;
}
.order-need .search-btn{
    height: 40px;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;    
    background-color: #fff;
    border: 1px solid #ccc;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    color: #000;
    font-size: 18px;
}
.order-menu{
    width: 100%;
    height: 70px;
    background-color: #fff;
    margin-top: 20px;
    border-radius: 8px;
    display: flex;
}
.order-menu>div{
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 2px;
    font-size: 14px;
    color: #535353;
}
.order-list{
    width: 100%;
    margin-top: 20px;
}
.order-list>li{
    width: 100%;
    background-color: #fff;
    padding-top: 16px;
    border-radius: 8px;
    margin-bottom: 15px;
}
.order-header{
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #535353;
    padding-left: 30px;
    height: 42px;
    border-bottom: 1px solid #eee;
}
.order-header>div{
    margin-right: 30px;
}
.order-detail span{
    color: #084AFB;
}
.product-list{
    border-right: 1px solid #eee;
    padding-right: 0;
}
.product-item{
    display: flex;
    align-items: center;
    text-align: center;
    padding: 15px 0;
    border-bottom: 1px solid #eee;
    font-size: 14px;
}
.product-item .el-row{
    display: flex;
    align-items: center;
    text-align: center;
}
.product-item div{
    padding: 0 2px;
}
.product-item span{
    padding: 0 2px;
}
.product-desc{
    display: flex;
    align-items: center;
    padding-right: 5px!important;
}
.product-desc>img{
    width: 76px;
    height: 55px;
    margin-right: 10px; 
}
.center{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-right: 1px solid #eee;
}
.order-content{
    display: flex;
}
.order-total>span:first-child{
    font-size: 20px;
    color: #535353;
}
.order-total>span:last-child{
    font-size: 14px;
    color: #535353;
}
.order-status{
    text-align: center;
    font-size: 14px;
    color: #535353;
}
.order-status>span:first-child{
    font-size: 16px;
}
.red{
    display: flex;
    flex-direction: column;
    color: #A5242A;
}
.tocommit{
    background-color: #B41D28;
    width: 83px;
    height: 36px;
    line-height: 36px;
    color: #fff;
    font-size: 16px;
    text-align: center;
}
.again{
    font-size: 16px;
    color: #AE8B5B;
    display: block;
    margin-top: 19px;
}
.el-row{
    width: 100%;
}
.order-list .el-row .el-col{
    height: 100%;
}
.order-list .el-row .el-col div{
    height: 100%;
}
</style>
