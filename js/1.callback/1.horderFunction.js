// 高阶函数  函数的参数是函数，或者这个函数返回一个新的函数，我们就叫他高阶函数

// AOP  面向切片编程

// before 函数
function say(who) {
  console.log(`${who} hello`)
}

Function.prototype.before = function (beforeFunc) {
  // 返回了一个包装后的函数，希望按照顺序输出想要的结果， 没有破坏原有的方法，并且实现了切片编程
  return  (...args) => {   // 数组收集
    beforeFunc()
    this(...args)   // 数组展开，去方括号
  }
}

let beforeSay = say.before(() => {
  console.log('开始说话')
})

beforeSay('Jason')

// react 中的事务
