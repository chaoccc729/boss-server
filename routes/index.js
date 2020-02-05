var express = require('express');
var router = express.Router();

const md5 = require('blueimp-md5');
const UserModel = require('../db/models').UserModel;

const filter = {password: 0, _v: 0} // 查询时过滤出指定的属性

//注册的路由
router.post('/register',function(req,res){
  //读取请求参数数据
  const {username, password, type} = req.body;
  //处理数据
  //1.判断用户书否已经存，存在即错误，不存在保存
  UserModel.findOne({username}, function(err,user){
    if (user){//用户存在
      res.send({code: 1, msg: '此用户已存在'});
    } else {//新用户
      new UserModel({username, password: md5(password), type}).save(function(err,user){
        const data = {username, type, _id:user._id};
        res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7}) // 持久化 cookie, 浏览器会保存在本地文件
        res.send({code: 0, data});
      })
    }
  })
})
//登录路由    
router.post('/login', function(req,res){
  const {username, password} = req.body;
  //查询数据库
  UserModel.findOne({username, password: md5(password)}, filter, function(err,user){
    if (user) { //用户存在
      res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7});
      res.send({code: 0, data: user});
    } else { //用户不存在
      res.send({code: 1, msg: '用户名或密码不正确'})
    }
  })
})                        
module.exports = router;