var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/*
1. 获取请求参数
2. 处理数据
3. 返回相应
*/
router.post('/register',function(req,res){
  console.log('register()');
  const {username,password} = req.body;//获取数据
  if(username == 'admin'){//注册失败
    res.send({code:1,msg:'此用户已存在'})
  }else{//注册成功
    res.send({code:0,data:{id:'123',username,password}})
  }
})

module.exports = router;
