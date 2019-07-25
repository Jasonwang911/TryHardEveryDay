// 判断数据类型
// typeof instanceof constructor Object.prototype.toString.call()

function isType(type) {
  // 闭包
  return function(content) {
    return Object.prototype.toString.call(content) === `[object ${type}]`;
  };
}
const types = ["String", "Boolean", "Number", "Null", "Underfined"];
// { isString: isType('String') }
const utils = {};
for (let i = 0; i < types.length; i++) {
  let type = types[i];
  // utils.isString = function    高阶函数的预置参数，和bind函数一样
  utils[`is${type}`] = isType(type);
}
let flag = utils.isString("hello");
console.log(flag);

// 如何实现科理化参数   科理化：下面两个函数的正向转换    反科理化： 逆向转换
function fn(a, b, c) {
  return a + b + c;
}
function fn(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

// 偏函数
function fn1(a, b) {
  return function(c) {
    return a + b + c;
  };
}
