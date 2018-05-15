import axios from './axiosService' // 引入加了拦截器的axios

// 查询图片的评论信息api
export const getImageComment=(data) => {
  return axios.post('image/comment', data)
};
// 查询用户的评论信息api
export const getUserComment=(data) => {
  return axios.post('user/comment', data)
};

// 提交评论api
export const addComment=(data) => {
  data.createTime=new Date();
  return axios.post('addComment', data)
};
// 评论点赞api
export const support=(data) => {
  return axios.post('supporter', data)
};
// 删除评论api
export const deleteComment=(data) => {
  return axios.delete('deleteComment', data)
};
