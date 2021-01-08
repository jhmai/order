<template>
    <div class="navbar-component">
        <div class="navbar">
            <div class="nav-left">
                <router-link class="logo" to='/home' tag='div'>
                    <img src="@/assets/images/v2_qkan5x.png">
                    金意陶订单系统
                </router-link>
                
            </div>
            <div class="nav-right">
                <ul class="nav nav-pills">
                    <li :class="[activeIndex==1?'active':'']" @click='handleSelect(0)'>
                        <el-dropdown :show-timeout='50' :hide-timeout='50' placement='bottom-start'>
                          <el-button type="primary">
                            <span>{{userInfo.real_name}}</span>
                            <i class="el-icon-caret-bottom" style="margin-left: 10px;"></i>
                          </el-button>
                          <el-dropdown-menu slot="dropdown" >
                            <ul class="dropdown-menu">
                            <li class="user">
                                <div class="user-info">
                                    <div class="user-name">
                                        <span class="username">{{userInfo.real_name}}</span>
                                        <span class="duty">管理员</span>
                                    </div>
                                    <p class="company"></p>
                                </div>
                                <div class="user-img">
                                    <img :src="userInfo.avatar">
                                </div>
                            </li>
                            <li class="store-info">
                                <div>
                                    <span>客编</span>
                                    <span class="customer-number">
                                    {{userInfo.assistantInfo&&userInfo.assistantInfo.customer_code}}
                                    </span>
                                </div>
                                <div>
                                    <span>门店</span>
                                    <span class="store-address">
                                    {{userInfo.assistantInfo&&userInfo.assistantInfo.customer_name}}
                                    </span>
                                </div>
                            </li>
                            <router-link tag='li' to='/personal' class="menu-item" style="border-bottom: 1px solid #EEEEEE">
                                <span>个人中心</span>
                                <span class="glyphicon glyphicon-menu-right" aria-hidden="true" style="font-size: 5px;color: #ccc"></span>
                            </router-link>
                            <li class="menu-item" @click='logout'>
                                <span>退出登陆</span>
                                <span class="glyphicon glyphicon-menu-right" aria-hidden="true" style="font-size: 5px;color: #ccc""></span>
                            </li>
                        </ul>
                          </el-dropdown-menu>
                        </el-dropdown>
                    </li>
                    <li :class="[activeIndex==2?'active':'']" @click='handleSelect(2)'>
                        <div href="#">消息通知</div>
                    </li>
                    <router-link tag='li' to='/cart' :class="[activeIndex==3?'active':'']" @click='handleSelect(3)'>
                        <div href="#">购物车{{cartNum?'('+cartNum+')':''}}</div>
                    </router-link>
                    <li :class="[activeIndex==4?'active':'']" @click='handleSelect(4)'>
                        <div href="#">联系客服</div>
                    </li>
                
                </ul>
            </div>
      </div>
      <div class="padd"></div>
    </div>
    
</template>

<script>
export default {
    name: 'navbar',
    data() {
      return {
        activeIndex: '0',
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        this.activeIndex=key
      },
      logout(){
        this.$store.commit('user/removeToken')
        this.$router.push('/login')
      }
    },
    mounted (){
        
    },
    computed:{
        userInfo(){
            return this.$store.getters.userInfo
        },
        cartNum(){
            return this.$store.state.cart.cartNum
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.navbar{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15%;
    background-color: #333333;
    color: #B1B1B1;
    min-height: 40px;
    height: 40px;
    z-index: 999;
}
.padd{
    padding-top: 40px;
}
.logo{
    display: flex;
    align-items: center;
    cursor: pointer;
}
.logo>img{
    width: 18px;
    height: 19px;
    margin-right: 5px;
}
.nav-right{
    display: flex;
    justify-content: flex-end;
}
.nav-pills{
    display: flex;
}
.nav-pills>li{
    margin-right: 20px;
    height: 40px;
}
.nav-pills>li:last-child{
    margin-right: 0px;
}
.nav-pills>li>div{
    color: #B1B1B1;
    font-size: 14px;
    line-height: 40px;
    padding: 0 5px;
}
.nav-pills > li.active > div{
    background-color: #434343
}
.nav-pills > li.active > div{
    background-color: #434343
}
.nav-pills/deep/.el-button--primary{
    background-color:#333333;
    border: none;
    color: #B1B1B1;
}
.navbar/deep/.el-dropdown-menu{
    min-width: 280px;
    padding: 8px;
}
.el-dropdown-menu li{
    padding:15px 8px;
}
.user{
    width: 280px;
    display: flex;
    align-items: flex-start;
}
.user-info{
    flex: 1;
    border-bottom: 1px solid #EEEEEE;
}
.user-img{
    width: 35px;
    height: 35px;
    margin-left: 18px;
}
.user-img>img{
    width: 100%;
    height: 100%;
    border-radius: 10px;
}
.user-name{
    display: flex;
    align-items: center;
}
.user-name>span:first-child{
    font-size: 15px;
    font-weight: bold;
    margin-right: 5px;
    color: #000;
}
.user-name>span:last-child{
    font-size: 6px;
    font-weight: bold;
    margin-right: 2px;
    color: #A5242A;
    padding: 2px 8px;
    background-color: #FFF7F0;
    border-radius: 3.5px;
}
.company{
    font-size: 8px;
    color: #404952;
    margin-top: 6px;
}
.store-info{
    width: 100%;
    background-color: #F3F4F6;
    margin: 8px 0;
    padding: 12px;
    box-sizing: border-box;
}
.store-info>div{
    font-size: 8px;
}
.store-info>div:first-child{
    margin-bottom: 9px;
}
.store-info>div>span:first-child{
    color: #9A9A9A;
    margin-right: 10px;
}
.store-info>div>span:last-child{
    color: #535353;
    margin-right: 10px;
}
.menu-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    font-size: 10px;
    color: #535353;
}
.dropdown-menu{
    padding: 10px;
    padding-bottom: 0;
}
li{
    cursor: pointer;
}
</style>
