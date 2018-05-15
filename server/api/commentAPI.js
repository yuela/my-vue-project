const query = require('../dbutil/db');
const jsonWrite = require('../middleware/jsonWrite');
const express = require('express');
const router = express.Router();

// 查询图片对应的评论的接口
router.post('/api/image/comment', (req, res) => {
  let num = req.body.count;
  let sql = "select commentText,supporter,parentID,createTime,comments.userID,userName from comments left outer join users on users.userID=comments.userID where imageID=? limit "+(num - 1)*10+",10";
  let params = req.body.imageID;
  query(sql, [params,num], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});

// 查询用户所有的评论
router.post('/api/user/comment', (req, res) => {
  let num = req.body.count;
  let sql = "select commentText,supporter,parentID,createTime,imageUrl,title from comments,images,users where comments.imageID=image.imageID and userName=? limit "+(num - 1)*10+",10";
  let params = req.body.userName;
  query(sql, [params,num], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});

//提交评论
router.post('/api/addComment', (req, res) => {
  let sql = "insert into comments(commentText,supporter,parentID,createTime,imageID) values (?,?,?,?,?)";
  let params = req.body;
  conn.query(sql, [params.commentText,0,params.parentID,params.createTime,params.imageID], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});

//修改评论浏览量
router.post('/api/supporter', (req, res) => {
  if(req.body.cancel){
    let sql = "update comments set supporter=supporter-1 where commentID=? ";
  }else{
    let sql = "update comments set supporter=supporter+1 where commentID=? ";
  }
  let params = req.body.commentID;
  conn.query(sql, params, function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});

// 删除评论接口
router.delete('/api/deleteComment', (req, res) => {
  let sql = "delete from comments where commentID=?";
  let params = req.body.commentID;
  conn.query(sql, [params], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});
module.exports = router;
