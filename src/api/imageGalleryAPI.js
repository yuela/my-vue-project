import axios from './axiosService' // 引入加了拦截器的axios

// 查询用户上传的图片集信息api
export const getUserImageGallery=(data) => {
  return axios.post('user/imageGallery', data)
};

// 查询单个图片集信息api
export const imageGalleryInfo=(data) => {
  return axios.post('imageGalleryInfo', data)
};
// 查询图片集总数量信息api
export const getImageGalleryCount=(data) => {
  return axios.get('imageGalleryCount',data)
};
// 查询所有图片集api
export const getImageGallerys=(data) => {
  return axios.post('imageGallerys', data)
};

// 创建图片集api
export const addImageGallery=(data) => {
  data.createTime=new Date();
  data.cover="imageGallery_default.jpg";
  return axios.post('addImageGallery', data)
};
// 修改图片集信息api
export const editImageGallery=(data) => {
  return axios.post('editImageGallery', data)
};
// 删除图片集api
export const deleteImageGallery=(data) => {
  return axios.delete('deleteImageGallery', data)
};
