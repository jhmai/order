import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import cart from './modules/cart'
import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	cacheArr: []
  },
  mutations: {
  	keepAlive(state,component){
      
  		!state.cacheArr.includes(component)&&state.cacheArr.push(component)
  	},
  	noKeepAlive(state,component){
  		let index = state.cacheArr.indexOf(component);
      	index > -1 && state.cacheArr.splice(index, 1);
  	}
  },
  actions: {
  },
  modules: {
  	user,
  	cart
  },
  getters
})
