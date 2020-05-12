import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'http://129.204.42.38:88/'
// axios.defaults.baseURL = 'http://localhost:3000/'

axios.defaults.timeout = 10000

/**
 * 允许跨域携带凭证（cors)
 */
axios.defaults.withCredentials = true

/**
 * 设置请求传递数据的格式
 * x-www-form-urlencoded
 */
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

/**
 * 把post请求的格式转换为类似上面的格式
 */
axios.defaults.transformRequest = data => qs.stringify(data)

/**
 * 设置请求拦截器
 * TOKEN校验：接收服务器返回的token，存储到vuex/本地存储中，每一次向服务器发请求，我们应该吧token带上
 */
// axios.defaults.request.use(
//   config => {
//     // 携带上token
//     let token = localStorage.getItem('token')
//     token && (config.headers.Authorization = token)
//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )

/**
 * 响应拦截器
 * 服务器返回信息
 */
// axios.interceptors.response.use(
//   response => {
//     return response.data
//   },
//   error => {
//     let { response } = error
//     if (response) {
//       //服务器返回结果
//       switch (response.status) {
//         case 401: //权限
//           break
//         case 403: //token过期
//           break
//         case 404: //找不到页面
//           break
//       }
//     } else {
//       //服务器没有返回结果
//       if (!window.navigator.onLine) {
//         //断网处理
//         return
//       }
//       return Promise.reject(error)
//     }
//   }
// )

export default axios
