import { getCartNum } from '@/api/cart'
const state={
	cartNum:''
}

const mutations={
	setCartNum(state,num){
		state.cartNum=num
	}
}

const actions={
	getCartNum({commit}){
		return new Promise((reslove,reject)=>{
			getCartNum().then(res=>{
				commit('setCartNum',res.data.data.count)
				reslove(res)
			})
		})
		
	}
}

export default{
	namespaced:true,
	state,
	mutations,
	actions
}