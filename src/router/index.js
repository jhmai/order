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
    path:'/productList/:id',
    name:'productList',
    component:()=>import('@/views/ProductList/productList.vue'),
    meta:{

    }
  },
  {
    path:'/productDetail/:id',
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
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  
  if (store.getters.token) {
    if (to.name=='login') {
      next('/login')
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
