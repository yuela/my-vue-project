const query = require('../dbutil/db');
const jsonWrite = require('../middleware/jsonWrite');
const express = require('express');
const router = express.Router();

// 查询所有上传的图片集的数目
router.get('/api/imageGalleryCount', (req, res) => {
  let sql = "select count(imageGalleryID) as count from imagegallery";
  let params=req.body;
  let data=[];
  if(params.userID!=undefined){
    sql=sql+" where userID=?";
    data=[params.userID];
  }
  query(sql, data, function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});
// 查询用户上传的图片集的接口
router.post('/api/user/imageGallery', (req, res) => {
  // let num = req.body.count;
  let sql = "select imagegallery.imageGalleryID,imageGalleryName,createTime from imagegallery where userID=?";
  let params = req.body.userID;
  // console.log(params);
  query(sql, [params], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});
// 查询图片集的信息接口
router.post('/api/imageGalleryInfo', (req, res) => {
  let sql = "select imageGalleryID,imageGalleryName,createTime,userName from imageGallery inner join users on imagegallery.userID=users.userID where imageGalleryID=?";
  let params = req.body.imageGalleryID;
  console.log(params);
  query(sql, [params], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});
// 查询所有上传的图片集
router.post('/api/imageGallerys', (req, res) => {
  let num = req.body.count;
  let sql = "select imagegallery.imageGalleryID,imageGalleryName," +
    "createTime,cover,userName from imagegallery inner join users on " +
    "imagegallery.userID=users.userID limit "+(num - 1)*10+",10";
  query(sql, [num], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});
//上传图片集
router.post('/api/addImageGallery', (req, res) => {
  let sql = "insert into imagegallery(imageGalleryName,createTime,userID,cover) values (?,?,?,?)";
  let params = req.body;
  query(sql, [params.imageGalleryName,params.createTime,params.userID,params.cover], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});
// 修改图片集信息接口
router.post('/api/editImageGallery', (req, res) => {
  let sql = "update imagegallery set imageGalleryName=? and cover=? where imageGalleryID=? ";
  let params = req.body;
  query(sql, [params.imageGalleryName,params.cover,params.imageGalleryID], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});
// 删除图片集接口
router.delete('/api/deleteImageGallery', (req, res) => {
  let sql = "delete from imagegallery where imageGalleryID=?";
  let params = req.body.imageGalleryID;
  query(sql, [params], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});
module.exports = router;
