import axios from '@/utils/request'
export function addCart(data){
	return axios.post('requireCart/add',data)
}
export function deleteCart(data){
	return axios.post('cartRequire/del',data)
}
export function getCartNum(data){
	return axios.get('cartRequire/count')
}
export function getCartList(data){
	return axios.post('cartRequire/list')
}