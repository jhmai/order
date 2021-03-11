import { login,userInfo} from '@/api/user'
const state={
	token:localStorage.getItem('token'),
	userInfo:{}
}
const mutations={
	setToken(state,token){
		localStorage.setItem('token',token)
		state.token=token
	},
	removeToken(state){
		localStorage.removeItem('token')
		state.token=''
	},
	setUserInfo(state,userInfo){
		state.userInfo=userInfo
	}
}
const actions={
	login({commit},password){
		return new Promise((reslove,reject)=>{
			login({code:password}).then(res=>{
				const data=res.data.data;
				commit('setToken',data.token)
				reslove(res)
			}).catch(err=>{
				reject(err)
			})
		})
	},
	getUserInfo({commit}){
		return new Promise((reslove,reject)=>{
			userInfo().then(res=>{
				commit('setUserInfo',res.data.data)
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