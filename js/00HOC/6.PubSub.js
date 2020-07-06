// 发布订阅模式  发布emit  订阅on  发布订阅是典型的一种一对多的关系  [fn, fn, fn]  发布和订阅两者没有直接关系
// 观察者模式是基于发布订阅模式的 Vue中就是典型的观察者模式   把观察者放到被观察者中
let fs = require('fs')
let path = require('path')

class Events {
  constructor() {
    this.stack = []
  }
  emit() {
    this.stack.forEach(callback => callback())
  }
  on(callback) {
    this.stack.push(callback)
  }
}

let school = {}
let events = new Events()

events.on(() => {
  console.log('已经接受到')
})
events.on(() => {
  if(Object.keys(school).length === 2) {
    console.log(school)
  }
})

fs.readFile(path.resolve(__dirname, './file/name.txt'), 'utf8', function(err, data) {
  school.name = data
  events.emit()
})
fs.readFile(path.resolve(__dirname, './file/age.txt'), 'utf8', function(err, data) {
  school.age = data
  events.emit()
})