
const jsonWrite = function(res, ret) {
  if(typeof ret === 'undefined') {
    res.json({
      success: false,
      msg: '操作失败'
    });
  } else {
    res.json({
      success:true,
      msg:ret
    });
  }
};
module.exports = jsonWrite;
