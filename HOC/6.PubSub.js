// 发布(emit)订阅(on)模式： 一种一对多的关系  [fn, fn, fn]
// 将函数依次放入数组叫订阅，依次执行数组中的方法叫发布
// after函数的方法
let fs = require("fs");

// 请求完成后分别打印最终结果，再打印一次已经处理完毕
class Events {
  constructor() {
    this.stack = [];
  }
  on(callback) {
    this.stack.push(callback);
  }
  emit() {
    this.stack.forEach(callback => callback());
  }
}

let events = new Events();
let school = {};

events.on(function() {
  if (Object.keys(school).length === 2) {
    console.log(school);
  }
});

events.on(function() {
  console.log("当前获取完毕");
});

fs.readFile("./name.txt", "utf8", function(err, data) {
  school.name = data;
  events.emit();
});
fs.readFile("./age.txt", "utf8", function(err, data) {
  school.age = data;
  events.emit();
});

// 观察者模式是基于发布订阅模式的
// 区别：
// 发布订阅模式： 发布和订阅两者没有直接关系
// 观察者模式： 把观察者放入被观察者中
