import axios from 'axios'

export default (url,data={},type='get') => {
  return new Promise((resolve,reject) => {
    let promise
    if(type==='get') {
      promise = axios.get(url,{params:data})
    }
    if(type==='post') {
      promise=axios.post(url,data)
    }
    promise.then((res) => {
      res= res.data
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}
