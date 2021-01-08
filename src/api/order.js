import axios from '@/utils/request'
export function getPrice (data){
	return axios.post('/order/getPrice',data)
}
export function getConfirmRequire (data){
	return axios.post('order/confirmRequire',data)
}
export function getOrderList (data){
	return axios.get('requireOrder/list',{params:data})
}
export function createRequire (key,data){
	return axios.post('order/createRequire/'+key,data)
}