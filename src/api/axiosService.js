import axios from 'axios'
import store from '../store/store'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 5000
});

// respone拦截器
service.interceptors.response.use(response => {
  return response
}, error => {
  console.log('err' + error);
  const status = error.response.status;
  if (status === 403) { // 后台返回403
    store.commit('logout');
    store.commit('showLoginDialog') // 重新登录
  }
  return Promise.reject(error);
});

export default service;
