import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/reset.css';
import './assets/css/border.css';
import axios from '@/utils/request.js'
import qs from 'qs'
import filters from '@/utils/filters'
import searchbar from './components/SearchBar/SearchBar'

Vue.component('searchbar',searchbar)
Object.keys(filters).forEach(key=>{
	Vue.filter(key,filters[key])
})
console.log(Object.keys(filters))
Vue.prototype.axios=axios;
Vue.prototype.qs=qs;
Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
