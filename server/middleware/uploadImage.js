const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './static/images/upload');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname +"_"+Date.now()+"."+file.originalname.split(".")[1]);
  }
});
//添加配置文件到muler对象。
const upload = multer({
  storage: storage,
  //其他设置请参考multer的limits
  //limits:{}
});
//导出对象
module.exports = upload;
