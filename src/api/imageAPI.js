import axios from './axiosService' // 引入加了拦截器的axios

// 查询所有图片api
export const getImageList=(data) => {
  return axios.post('imageList', data)
};
// 上传图片api
export const uploadImage=(data) => {
  return axios.post('upload',data)
};
// 上传图片api
export const addImage=(info) => {
  return axios.post('addImage',info)
};
// 增加图片浏览量api
export const lookCount=(data) => {
  return axios.post('lookCount', data)
};
// 修改图片信息api
export const editImage=(data) => {
  return axios.post('editImage', data)
};
// 删除图片api
export const deleteImage=(data) => {
  return axios.delete('deleteImage', data)
};
// 获取图片数量api
export const imageCount=(data) => {
  return axios.post('imageCount', data)
};
// 查询图片信息api
export const imageInfo=(data) => {
  return axios.post('image', data)
};
