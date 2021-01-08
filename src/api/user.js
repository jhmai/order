import axios from '@/utils/request'
export function login(data){
	return axios.post('login/code',data)
}
export function userInfo(data){
	return axios.post('userinfo')
}