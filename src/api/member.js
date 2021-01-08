import axios from '@/utils/request'
export function getConfig (){
	return axios.get('/config/per_config')
}
export function getCustomerInfo (){
	return axios.get('/config/getCustomerRelationInfo')
}