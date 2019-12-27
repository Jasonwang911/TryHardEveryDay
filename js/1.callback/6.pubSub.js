/*
 * @Author: Jason wang
 * @Date: 2019-12-24 15:40:46
 * @Descripttion: 异步--发布订阅模式
 */

// node中异步I/O    file system 文件系统   希望两次读取文件后分别打印结果，再打印一次已经处理完毕
let fs = require('fs')

class Events{
  constructor() {
    this.stack = []
  }
  on(callback) {
    this.stack.push(callback)
  }
  emit() {
    this.stack.forEach(callback => callback())
  }
}

// 发布 emit   订阅 on   一种一对多的关系  [fn, fn, fn]
let events = new Events()

let school = {}

// 两次读取文件后分别打印结果
events.on(() => {
  console.log('读取了一个文件', school)
})

// 打印最终结果
events.on(() => {
  if(Object.keys(school).length === 2) {
    console.log('最终结果', school)
  }
})

// 异步读取文件
fs.readFile('./static/name.txt', 'utf8', function(err, data) {
  school.name = data
  events.emit()
})

fs.readFile('./static/age.txt', 'utf8', function(err, data) {
  school.age = data
  events.emit()
})