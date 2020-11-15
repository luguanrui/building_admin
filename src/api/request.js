import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
axios.baseURL = process.env.VUE_APP_API_BASE_URL
const baseApi = '/building/'

axios.defaults.retry = 4
axios.defaults.retryDelay = 1000
// 请求拦截
axios.interceptors.request.use(
  config => {
    const sessionId = localStorage.getItem('sessionId')
    if (sessionId) {
      config.headers['TLSESSIONID'] = localStorage.getItem('sessionId')
      config.timeout = 1000000
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截
axios.interceptors.response.use(
  response => {
    let data = response.data
    if (data.code) {
      switch (data.code) {
        case 200:
          Promise.resolve(data)
          break
        case 3011:
          localStorage.clear()
          window.location.href = '/'
          break
        default:
          Vue.prototype.$message.destroy()
          Vue.prototype.$message.error(data.msg)
          break
      }
    }
    return data
  },

  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 403:
          err.message = '长时间未操作，请重新登录'
          window.location.href = '/'
          break
        case 413:
          err.message = '上传文件太大'
          break
        default:
          err.message = `网络异常(${err.response.status})`
      }
    } else {
      // err.message = '连接服务器失败！'
    }
    if (err.message === 'Network Error') {
      err.message = '网络异常'
    }
    Vue.prototype.$message.destroy()
    Vue.prototype.$message.error(err.message)
    return Promise.reject(err)
  }
)
export { axios, baseApi, qs }
