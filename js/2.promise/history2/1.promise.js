/*
 * @Author: Jason wang
 * @Date: 2019-12-26 13:26:01
 * @Descripttion: Promise的使用
 */
let fs = require('fs')
let Promise = require('./promise/promise')

let p = new Promise((resolve, reject) => {  // excutor 执行器
  // throw new Error('出错了')
  // 读取文件成功后调取成功
  fs.readFile('./publish/name.txt', 'utf8', function(err, name) {
    if(err) {
      return reject(err)
    }
    resolve(name)
  })
})

// promise 有多个状态，如果成功会让成功的函数依次执行，如果失败会让失败的函数依次执行  --- 发布订阅模式
p.then((value) => {  // fulfilled 
  console.log('成功', value)
}, (reason) => {   // rejected
  console.log('失败', reason)
})

// p.then((value) => {  // fulfilled 
//   console.log('成功', value)
// }, (reason) => {   // rejected
//   console.log('失败', reason)
// })