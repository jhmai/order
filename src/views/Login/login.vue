<template>
    <div class="login">
       <div class="login-body" :style="bgImg">
            <div class="modal-dialog" role="document"></div>
            <div class="login-logo">
                <img src="@assets/images/v2_qkani3.png">
            </div>
            <div class="login-box">
                <div class="login-box-title" :style="titleImg">
                    <img src="@assets/images/v2_qkan5x.png">
                    <span>订单系统</span>
                </div>
                <div class="login-box-content">
                    <div class="login-password" v-show='loginType==0'>
                        <div class="change change-qrcode" @click='changeType(1)'>
                            <p>点这里 →</br>扫码登录</p>
                            <img src="@assets/images/v2_qkant7.png">
                        </div>
                        <div class="login-password-content">
                            <input type="text" name="" placeholder="请输入验证码登录" class="code" v-model='code'>
                            <button class="login-btn" @click='login'>登 录</button>
                        </div>
                    </div>
                    <div class="login-qrcode" v-show='loginType==1'>
                        <div class="change change-code" @click='changeType(0)'>
                            <p>点这里 →</br>验证码登录</p>
                            <img src="@assets/images/v2_qkanar.png">
                        </div>
                        <div class="login-qrcode-content">
                            <div class="qrcode">
                                <img src="@assets/images/v2_qkan7c.png">
                            </div>
                        </div>
                        <p class="saoma">助销宝 <span>扫一扫登录</span></p>
                    </div>
                </div>
                <div class="imglist">
                    <img src="@assets/images/v2_qkani3.png">
                    <span>×</span>
                    <img src="@assets/images/v2_qkanjp.png">
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { login } from '@/api/user'
export default {
    name: 'login',
    data(){
        return{
            bgImg:{
                background: "url("+require('@assets/images/loginbg3.png')+") no-repeat center center"
            },
            titleImg:{
                backgroundImage: "url("+require('@assets/images/v2_qkan3e.png')+")"
            },
            loginType:0,
            code:'',
            redirect:''
        }
    },
    methods:{
        changeType(type){
            this.loginType=type
        },
        login(){
            this.$store.dispatch('user/login',this.code).then(res=>{
                console.log(res.data)
                
                if (!this.redirect) {
                    this.$router.push('/home')
                }else{
                    this.$router.go(-1)
                }
                
            })

        }
    },
    components: {
      
    },
    mounted(){
        console.log(this.$route.query)
        this.redirect=this.$route.query.redirect;
    }
}
</script>
<style lang="scss" scoped>
.login{
    width: 100%;
    height: 100%;
}
.login-body{
    width: 100%;
    height: 100%;
    position: relative;
    /*background: url(@assets/images/loginbg3.png) no-repeat center center;*/
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.login-logo{
    position: absolute;
    left: 50px;
    top: 30px;
    width: 250px;
}
.login-logo>img{
    width: 100%;
}
.login-box{
    position: absolute;
    left: 450px;
    top: 20%;
    background-color: #fff;
    width: 400px;
    height: 400px;
    border-radius: 20px;
}
.login-box-title{
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%,-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    /*background-image: url(../images/v2_qkan3e.png);*/
    background-repeat: no-repeat;
    background-size: contain;
    width: 150px;
    height: 50px;
    color: #fff;
    font-size: 20px;
}
.login-box-title>img{
    width: 25px;
    margin-right: 15px;
}
.change{
    position: absolute;
    right: 5px;
    top: 5px;
    font-size: 10px;
    color: #000000;
    display: flex;
    align-items: center;
}
.change>img{
    width: 50px;
}
.login-box-content{
    width: 100%;
    height: 100%;
}
.login-password{
    width: 100%;
    height: 100%;
}
.login-password-content{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.login-password-content>input{
    width: 60%;
    height: 30px;
    border: none;
    border-bottom: 1px solid #ccc;
    text-align: center;
    margin-bottom: 30px;
}
.login-btn{
    width: 60%;
    background-color: #640f14;
    border: none;
    height: 35px;
    color: #fff;
    font-size: 15px;
}
.login-qrcode{
    width: 100%;
    height: 100%;
}
.login-qrcode-content{
    width: 100%;
    height: 78%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 80px;
}
.qrcode{
    /*margin-bottom: 15px;*/
}
.saoma{
    text-align: center;
    font-size: 15px;
    margin-top: 15px;
}
.imglist{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    color: #fff;
    margin-top: 15px;
}
.imglist>img{
    height: 40px;
}
.imglist>span{
    margin-left: 20px;
}
</style>
