import axios from '@/utils/request'
export function getCategory (){
	return axios.post('/category')
}
export function getProducts (data){
	return axios.get('/products',{params:data})
}
export function getProductDetail (data){
	return axios.get('/product/detail/'+data)
}