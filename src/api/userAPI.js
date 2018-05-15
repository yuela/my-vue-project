import axios from './axiosService' // 引入加了拦截器的axios

// 登录api
export const login=(data) => {
  return axios.post('login', data)
};
// 注册api
export const register=(data) => {
  data.registerTime=new Date();
  data.role=1;
  return axios.post('addUser', data)
};

// 检测用户名api
export const checkName=(data) => {
  return axios.post('userName', data)
};
// 获取用户信息api
export const userInfo=(data) => {
  return axios.post('userInfo', data)
};
// 修改用户密码api
export const editPwd=(data) => {
  return axios.post('editPwd', data)
};
// 修改用户信息api
export const editUser=(data) => {
  return axios.post('editUser', data)
};
// 删除用户api
export const deleteUser=(data) => {
  return axios.delete('deleteUser', data)
};
