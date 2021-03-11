import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
{
    path:'/',
    name:'登录',
    redirect:'/login'
  },
  {
    path:'/home',
    name:'home',
    component:()=>import('@/views/Home/home.vue'),
    meta:{

    }
  },
  {
    path:'/login',
    name:'login',
    component:()=>import('@/views/Login/login.vue'),
    meta:{

    }
  },
  {
    path:'/productList',
    name:'productList',
    component:()=>import('@/views/ProductList/productList.vue'),
    meta:{
      savedPosition:100
    }
  },
  {
    path:'/productDetail/:id/',
    name:'productDetail',
    component:()=>import('@/views/ProductDetail/productDetail.vue'),
    meta:{

    }
  },
  {
    path:'/cart',
    name:'cart',
    component:()=>import('@/views/Cart/cart.vue'),
    meta:{

    }
  },
  {
    path:'/order',
    name:'order',
    component:()=>import('@/views/Order/order.vue'),
    meta:{

    }
  },
  {
    path:'/personal',
    name:'personal',
    component:()=>import('@/views/Personal/personal.vue'),
    meta:{

    }
  },
  {
    path: '*',   // 错误路由[写在最后一个]
    redirect: '/home'   //重定向
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    console.log(savedPosition)
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

const cacheArr=['home','productList']
router.beforeEach((to, from, next) => {
  console.log(cacheArr.includes(to.name))
  if(from.name=='login'){
    cacheArr.forEach(item=>{
      store.commit('noKeepAlive',item)
    })
  }else{
    if (cacheArr.includes(to.name)) {
        store.commit('keepAlive',to.name)
    }
  }
 

  if (store.getters.token) {
    if (to.name=='login') {
      next()
    }else{
      store.dispatch('cart/getCartNum').then(next())
      const userInfo=store.getters.userInfo.uid
      if (userInfo) {
        next()
      }else{
        store.dispatch('user/getUserInfo').then(next())
      }
    }
  }else{
    next()
  }
  
})

export default router
