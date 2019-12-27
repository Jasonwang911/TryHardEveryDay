/*
 * @Author: Jason wang
 * @Date: 2019-12-26 13:26:01
 * @Descripttion: Promise的使用
 */

// 先读取用户姓名 根据用户姓名获取年龄 根据年龄 推荐产品
let Promise = require('./promise/promise')


// Promise 是一个类，默认浏览器，高版本 node 都自带了，低版本使用es5-promise解决
let p = new Promise((resolve, reject) => {  // excutor 执行器
  // 状态默认是 padding
  console.log('excutor')
  resolve('赚钱了')
  reject('没有钱')
})

// 每个promise的实例上都又一个then方法
p.then((value) => {  // fulfilled 
  console.log('成功', value)
}, (reason) => {   // rejected
  console.log('失败', reason)
})