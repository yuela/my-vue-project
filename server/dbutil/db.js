var mysql=require("mysql");

// 数据库连接配置
 const mysqlDB= {
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'my_image',
    port: '3306'
  };

 //创建连接池
const mysqlPool = mysql.createPool(mysqlDB);

const query=function(sql,options,callback){
  mysqlPool.getConnection(function(err,conn){
    if(err){
      callback(err,null);
    }else{
      conn.query(sql,options,function(err,results){
        //释放连接
        conn.release();
        //事件驱动回调
        callback(err,results);
      });
    }
  });
};
module.exports =query;
