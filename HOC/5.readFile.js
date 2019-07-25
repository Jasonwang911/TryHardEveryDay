// node 中 异步的I/O
// file system
let fs = require("fs");
// 异步的  try catch 不能捕获异步的错误

// 异步的代码会等待同步的先执行完
// 分别读取name 和 age
// 异步并发问题主要靠计数器
// 回调函数的方法
// let school = {};
// function out() {
//   if (Object.keys(school).length === 2) {
//     console.log(school);
//   }
// }
// after函数的方法
function after(times, callback) {
  let school = {};
  return function out(key, value) {
    school[key] = value;
    if (--times === 0) {
      callback(school);
    }
  };
}
let out = after(2, school => {
  console.log(school);
});
fs.readFile("./name.txt", "utf8", function(err, data) {
  // console.log(data);
  // school.name = data;
  // out();
  out("name", data);
});
fs.readFile("./age.txt", "utf8", function(err, data) {
  // console.log(data);
  // school.age = data;
  // out();
  out("age", data);
});
