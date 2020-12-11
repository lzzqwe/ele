import ajax from './ajax'

const BASE ='http://localhost:3000/api'

export const getSeller =() => {
  return ajax(BASE+'/seller')
}
export const getGoods = () => {
  return ajax(BASE+'/goods')
}
export const getRatings = () => {
  return ajax(BASE+'/ratings')
}
