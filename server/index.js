// node 后端服务器

const userApi = require('./api/userAPI');
const imageGalleryApi = require('./api/imageGalleryAPI');
const imageApi = require('./api/imageAPI');
const commentApi=require('./api/commentAPI');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(function(req, res, next){
  //设置跨域访问
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
    next();
});
// app.use(express.static(__dirname + '/public'));
// 后端api路由
/*用户部分接口*/
app.use('/', userApi);
app.use('/', imageGalleryApi);
app.use('/', commentApi);
app.use('/', imageApi);


app.use('/api/login', userApi);//登录
app.use('/api/userInfo', userApi);//用户详情
app.use('/api/userName', userApi);//用户名是否重复
app.use('/api/addUser', userApi);//注册添加用户
app.use('/api/editPwd', userApi);//修改用户密码
app.use('/api/editUser', userApi);//修改用户信息
app.use('/api/deleteUser', userApi);//删除用户

/*图片集部分接口*/
app.use('/api/user/imageGallery', imageGalleryApi);//查询用户的图片集信息
app.use('/api/imageGalleryInfo', imageGalleryApi);//查询单个图片集信息
app.use('/api/imageGalleryCount', imageGalleryApi);//查询图片集总数量
app.use('/api/imageGallerys', imageGalleryApi);//查询所有图片集
app.use('/api/addImageGallery', imageGalleryApi);//添加图片集
app.use('/api/editImageGallery', imageGalleryApi);//修改图片集
app.use('/api/deleteImageGallery', imageGalleryApi);//删除图片集


/*图片部分接口*/
app.use('/api/imageList', imageApi);//查询所有图片
app.use('/api/upload', imageApi);//上传图片
app.use('/api/addImage', imageApi);//上传图片
app.use('/api/lookCount', imageApi);//增加图片浏览量
app.use('/api/editImage', imageApi);//修改图片信息
app.use('/api/deleteImage', imageApi);//删除图片
app.use('/api/imageCount', imageApi);//查询用户上传的图片信息
app.use('/api/image', imageApi);//查询单张图片
/*评论部分接口*/
app.use('/api/image/comment', commentApi);//查询图片的评论信息
app.use('/api/user/comment', commentApi);//查询用户的评论信息
app.use('/api/addComment', commentApi);//提交评论
app.use('/api/supporter', commentApi);//评论点赞
app.use('/api/deleteComment', commentApi);//删除评论

// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');
