// 高阶函数： 函数参数如果是函数，或者这个函数返回一个新的函数，这个函数就是高阶函数
// AOC面向切片编程

// before函数
function say(who) {
  console.log(`${who}hello`);
}

Function.prototype.before = function (beforeFunc) {
  // 如果使用普通函数，this会有问题，谁调用this指向谁，返回的函数是beforeSay调用的，this指向window
  // 箭头函数 没有this，并且没有arguments
  // ...args是数组  
  return (...args) => {
    beforeFunc()
    // ..args是展开运算符
    this(...args)
  };
};

let beforeSay = say.before(() => {
  console.log("开始说话");
});

beforeSay('AOC ');

// after 函数

Function.prototype.after = function (afterFunc) {
  return (...args) => {
    this(...args)
    afterFunc()
  }
}

let afterSay = say.after(() => {
  console.log('说话结束')
})

afterSay()