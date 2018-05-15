const query = require('../dbutil/db');
const jsonWrite = require('../middleware/jsonWrite');
const express = require('express');
const router = express.Router();
//登录接口
router.post('/api/login',(req,res)=>{
  let sql="select count(userName) from users where userName=? and password=?";
  let params=req.body;
  query(sql, [params.userName,params.password], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});

// 查询用户接口
router.post('/api/userInfo', (req, res) => {
  let sql = "select userID,userName,registerTime,age,gender,avatar from users where userName=?";
  let params = req.body.userName;
  query(sql, [params], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});

// 查询用户名是否存在接口
router.post('/api/userName', (req, res) => {
  let sql = "select count(userName) from users where userName=?";
  let params = req.body.userName;
  query(sql, [params], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});

//注册,添加用户
router.post('/addUser', (req, res) => {
  let sql = "insert into users(userName,password,registerTime,age,role,gender) values (?, ?, ?,?,?,?,?,?)";
  let params = req.body;
  query(sql, [params.userName,params.password,params.registerTime,params.age,params.role,params.gender], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});

// 修改用户密码接口
router.post('/editPwd', (req, res) => {
  let sql = "update users set password=? where userName=?";
  let params = req.body;
  query(sql, [params.password,params.userName], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});

// 修改用户信息接口
router.post('/editUser', (req, res) => {
  let sql = "update users set password=? and age=? and gender=? where userName=?";
  let params = req.body;
  query(sql, [params.password,params.age,params.gender,params.userName], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});


// 删除用户接口
router.delete('/deleteUser', (req, res) => {
  let sql = "delete from users where userName=?";
  let params = req.body.userName;
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
