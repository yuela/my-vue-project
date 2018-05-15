const query = require('../dbutil/db');
const jsonWrite = require('../middleware/jsonWrite');
const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadImage');
const fs = require('fs');
const path = require('path');
// 查询所有上传的图片
router.post('/api/imageList', (req, res) => {
  let num = req.body.count;
  let id=req.body.imageGalleryID;
  let sql = "select count(imageID) as count,imageID,imageUrl,title,lookCount,description from images where imageGalleryID=? limit "+(num - 1)*10+",10";
  query(sql, [num,id], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});
//添加图片
router.post('/api/upload',upload.single('imageFile'), (req, res) => {
  console.log(req.file);
  fs.rename(req.file.path, "./static/images/image/" + req.file.filename, function(err) {
      if (err) {
        throw err;
      }
    });
  jsonWrite(res,req.file);
});
//添加图片
router.post('/api/addImage', (req, res) => {
  let sql = "insert into images(imageHeight,imageWidth,imageSpace,imageUrl,createdTime,lookCount,description,title,imageGalleryID) values (?,?,?,?,?,?,?,?,?)";
  let params=req.body;
  params.createTime=new Date();
  console.log(params);
  query(sql, [params.imageHeight,params.imageWidth,params.imageSpace,params.imageUrl,params.createTime,0,params.description,params.title,params.imageGalleryID], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});
//修改图片浏览量
router.post('/api/lookCount', (req, res) => {
  let sql = "update images set lookCount=lookCount+1 where imageID=? ";
  let params = req.body.imageID;
  query(sql, params, function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});
// 修改图片信息接口
router.post('/api/editImage', (req, res) => {
  let sql = "update images set title=? and description=? where imageID=? ";
  let params = req.body;
  query(sql, [params.title,params.description,params.imageID], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});
// 删除图片接口
router.delete('/api/deleteImage', (req, res) => {
  let sql = "delete from images where imageID=?";
  let params = req.body.imageID;
  query(sql, [params], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});
// 查询图片集中图片的数量
router.post('/api/imageCount', (req, res) => {
  let id=req.body.imageGalleryID;
  let sql = "select count(imageID) as count from images where imageGalleryID=?";
  query(sql, [id], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});

//查询图片详细信息
// 查询图片集中图片的数量
router.post('/api/image', (req, res) => {
  let id=req.body.imageGalleryID;
  let sql = "select count(imageID) as count from images where imageGalleryID=?";
  query(sql, [id], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});

module.exports = router;
