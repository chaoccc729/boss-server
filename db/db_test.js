/*使用 mongoose 操作 mongodb 的测试文件
1. 连接数据库
1.1. 引入 mongoose
1.2. 连接指定数据库(URL 只有数据库是变化的)
1.3. 获取连接对象
1.4. 绑定连接完成的监听(用来提示连接成功)
2. 得到对应特定集合的 Model
2.1. 字义 Schema(描述文档结构)
2.2. 定义 Model(与集合对应, 可以操作集合)
3. 通过 Model 或其实例对集合数据进行 CRUD 操作
3.1. 通过 Model 实例的 save()添加数据
3.2. 通过 Model 的 find()/findOne()查询多个或一个数据
3.3. 通过 Model 的 findByIdAndUpdate()更新某个数据
3.4. 通过 Model 的 remove()删除匹配的数据
*/
const md5 = require('blueimp-md5')
// 1. 连接数据库
// 1.1. 引入 mongoose
const mongoose = require('mongoose')
// 1.2. 连接指定数据库(URL 只有数据库是变化的)
mongoose.connect('mongodb://localhost:27017/boss_test')
// 1.3. 获取连接对象
const conn = mongoose.connection
// 1.4. 绑定连接完成的监听(用来提示连接成功)
conn.on('connected', function () {
  console.log('数据库连接成功')
})
//2. 得到对应特定集合的 Model
//2.1. 字义 Schema(描述文档结构)
const userSchema = mongoose.Schema({//指定文档结构
  username: { type: String, required: true }, // 用户名
  password: { type: String, required: true }, // 密码
  type: { type: String, required: true }, // 用户类型: hunter/boss搬迁户展示，闭包·
})
//2.2. 定义 Model(与集合对应, 可以操作集合)
const UserModel = mongoose.model('user', userSchema) // 集合名: users
// CRUD
//3.1. 通过 Model 实例的 save()添加数据
function testSave() {
  //创建usermodel实例
  const userModel = new UserModel({
    username: 'chao111',
    password: md5('1234'),//加密
    type: 'hunter',
  })
  //保存到数据库
  userModel.save(function (err, user) {
    console.log('save', err, user)
  })
}
// testSave()
//3.2. 通过 Model 的 find()/findOne()查询多个或一个数据
function testFind() {
  //查找多个
  UserModel.find(function (err, users) { //如果有匹配返回的是一个[user, user..], 如果没有一个匹配的返回[]
    console.log('find() ', err, users)
  })
  //查找一个
  UserModel.findOne({
        _id: '5e32d339d96dd832fc188d9d'
      }, function (err, user) { //如果有匹配返回的是一个 user, 如果没有一个匹配的返回 null
    console.log('findOne() ', err, user)
  })
}
//testFind()
//3.3. 通过 Model 的 findByIdAndUpdate()更新某个数据
function testUpdate() {
  UserModel.findByIdAndUpdate({ _id: '5ae1241cf2dd541a8c59a981' }, { username: 'yyy' },
  function (err, user) {
    console.log('findByIdAndUpdate()', err, user)
  })
}
//testUpdate()
//3.4. 通过 Model 的 remove()删除匹配的数据
function testDelete() {
  UserModel.remove({ _id: '5ae1241cf2dd541a8c59a981' }, function (err, result) {
    console.log('remove()', err, result)
  })
}
//testDelete()