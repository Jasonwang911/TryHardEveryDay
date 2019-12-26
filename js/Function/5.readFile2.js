/*
 * @Author: Jason wang
 * @Date: 2019-12-24 15:40:46
 * @Descripttion: 异步--发布订阅模式
 */

// node中异步I/O    file system 文件系统
let fs = require('fs')


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