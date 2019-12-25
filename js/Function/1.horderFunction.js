// 高阶函数  函数的参数是函数，或者这个函数返回一个新的函数，我们就叫他高阶函数

// AOP  面向切片编程

// before 函数
function say() {
  console.log('hello')
}

Function.prototype.before = function (beforeFunc) {
  return function () {
    beforeFunc()
  }
}

let beforeSay = say.before(() => {
  console.log('开始说话')
})

beforeSay()