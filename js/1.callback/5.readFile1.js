/*
 * @Author: Jason wang
 * @Date: 2019-12-24 15:40:46
 * @Descripttion: 一个异步的例子--after函数（缺陷只能绑定一个函数）
 * 解决异步并发问题主要是靠计数器
 */

// node中异步I/O    file system 文件系统
let fs = require('fs')

// 异步的回调 
// let school = {}

// 潘顿异步方法执行是否达到预期，循环结果对象，判断预期结果值是否已经全部拿到
// function out() {
//   let num = Object.keys(school).length
//   if(num === 2) {
//     return true
//   }
//   return false
// }

function after(times, callback) {
  let checkForAttr = {}
  // out函数
  return (key, value) => {
    checkForAttr[key] = value
    if(--times === 0) {
      callback(checkForAttr)
    }
  }
  
}

let out = after(2, (result) => {
  console.log(result)
})

// 异步读取文件
fs.readFile('./static/name.txt', 'utf8', function(err, data) {
  // console.log(data)
  out('name', data)
})

fs.readFile('./static/age.txt', 'utf8', function(err, data) {
  // console.log(data)
  out('age', data)
})
// 分别读取到name和age属性，读取后拿到最后的结果再一起打印起来