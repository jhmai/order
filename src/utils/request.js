import axios from 'axios';
import Vue from 'vue';
import store from '@/store'
import router from '../router';
import { Message } from 'element-ui';
let baseURL=process.env.NODE_ENV=='development'?'api':'http://b2bapi.kito.cn'
const service = axios.create({
  timeout: 7000, // 请求超时时间
  baseURL: baseURL,
  method: 'post',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

service.interceptors.request.use(config=>{
	// vm.$store.commit('isLoading',true)
	  let token =store.getters.token
    if (token) {
        //将token放到请求头发送给服务器,将tokenkey放在请求头中
        config.headers.Authorization = 'Bearer '+token;     
    }
	return config
}, err => {
  return Promise.reject(err);
});

service.interceptors.response.use(config=>{
	// vm.$dialog.loading.close();
  // console.log(config.data.status)
  if (config.data.status==410000||config.data.status==410001) {
    localStorage.removeItem('token')
    
    setTimeout(function(){
      router.push({
        path:'/login'
      })
      Message.error('登录超时，请重新登录');
    },1500)
    

    // console.log(router)
  }
	return config
}, err => {
  
  // if(JSON.stringify(err).indexOf('301')!=-1){
  //   vm.$router.replace({
  //     path:'/login'
  //   })
  // }
  
  return Promise.reject(err);
});

export default service
