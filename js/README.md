# JS基础

### 堆栈（Stack）
1. 栈是一组数据的存放方式,特点是先进后出，后进先出


### JS的原始类型（Primitive）
JS中包含6种原始类型: boolean null undefined number string symbol  
1. 原始类型存储的都是值，是没有函数可以调用 
2. 原始类型会在必要的时候进行强制类型转换  
3. number 类型是浮点类型的  
4. tring 类型是不可变的，无论你在 string 类型上调用何种方法，都不会对值有改变。
5. 对于 null 来说，虽然 typeof null 会输出 object，但是这只是 JS 存在的一个悠久 Bug。在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象，然而 null 表示为全零，所以将它错误的判断为 object 。
```
'1'.toString()  // '1'
// '1' 已经不是原始类型了，而是被强制转换成了 String 类型也就是对象类型，所以可以调用 toString 函数。
```
### 对象类型（Object）
在 JS 中，除了原始类型那么其他的都是对象类型了。对象类型和原始类型不同的是，原始类型存储的是值，对象类型存储的是地址（指针）。当你创建了一个对象类型的时候，计算机会在内存中帮我们开辟一个空间来存放值，但是我们需要找到这个空间，这个空间会拥有一个地址（指针）。
这里要注意对象作为函数参数传递的情况
```
function test(person) {
  person.age = 26
  person = {
    name: 'yyy',
    age: 30
  }

  return person
}
const p1 = {
  name: 'yck',
  age: 25
}
const p2 = test(p1)
console.log(p1) // -> ?
console.log(p2) // -> ?
```
### typeof vs instanceof  
typeof 对于原始类型来说，除了 null 都可以显示正确的类型  
```
typeof 1 // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'
```
typeof 对于对象来说，除了函数都会显示 object，所以说 typeof 并不能准确判断变量到底是什么类型
```
typeof [] // 'object'
typeof {} // 'object'
typeof console.log // 'function'
```
如果想判断一个对象的正确类型，这时候可以考虑使用 instanceof，内部机制是通过原型链来判断的   
对于原始类型来说，你想直接通过 instanceof 来判断类型是不行的，当然我们还是有办法让 instanceof 判断原始类型的
```
class PrimitiveString {
  static [Symbol.hasInstance](x) {
    return typeof x === 'string'
  }
}
console.log('hello world' instanceof PrimitiveString) // true
```
Symbol.hasInstance 其实就是一个能让我们自定义 instanceof 行为的东西，以上代码等同于 typeof 'hello world' === 'string'，所以结果自然是 true 了。这其实也侧面反映了一个问题， instanceof 也不是百分之百可信的
[实现一个 instanceof]

## 闭包  


## React 事务---典型的AOP面向切片和高阶函数
在原有的函数的基础上可以增加一些方法,提供了一个preform方法，这个方法可以传入任意函数为参数，并对传入的方法进项包装，以便在传入方法调用前和调用后执行一些逻辑  
```
initialize  preform(anyMethod)  close   
```

## 柯理化参数 
如果一个函数的参数只有一个，返回的函数的参数还是一个，以此类推，所有返回的函数的参数都是一个
```
function fn(a, b, c) {
  return a+b+c
}
// 转换成以下函数
function fn(a) {
  return function(b) {
    return function(c) {
      return a+b+c
    }
  }
}
```

## 反柯理化
```
function fn(a) {
  return function(b) {
    return function(c) {
      return a+b+c
    }
  }
}
// 转换成以下函数
function fn(a, b, c) {
  return a+b+c
}
```

## 偏函数
函数返回一个函数，函数的参数的个数不确定
```
function fn(a,b) {
  return function(c) {

  }
}
```

## 发布订阅模式（一堆多的关系）  
订阅（emit）： 先准备好回调，时间到达便执行   [fn1, fn2, fn3]
发布（on）： 依次执行
```
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
```
vuex redux 都是基于发布订阅的

## 观察者模式  
观察者模式是基于发布订阅模式的，vue使用的观察者模式
观察者： 
被观察者：
把 观察者 放到 被观察者 中， 把父母放到宝宝内部，宝宝不开心了就会通知父母

```
// 被观察者
class Subject{
  constructor() {
    this.stack = []
    this.state = '开心'
  }
  // 接收观察者
  attach(observer) {
    this.stack.push(observer)
  }
  // 更新状态
  setState(newState) {
    this.state = newState
    this.stack.forEach(o => o.update(newState))
  }
}

 // 观察者
class Observer{
  constructor(name) {
    this.name = name
  }
  update(newState) {
    console.log(`${this.name}: 宝宝现在${newState}`)
  }
}

let father = new Observer('爸爸')
let mother = new Observer('妈妈')

let baby = new Subject('宝宝')
console.log(`宝宝开始的状态: ${baby.state}`)
baby.attach(father)
baby.attach(mother)

baby.setState('不开心')
```

区别： 
1. 发布订阅模式的发布和订阅两者没有直接关系，观察者模式的被观察者调度了观察者

## Promise 
1. Promise 解决的问题
- 回调嵌套/回调地狱
- 统一处理错误捕获
- 多个异步并发同步的处理 Promise.all

2. Promise遵循 Promise A+ 规范
- Promise的三个状态: pending fulfilled rejected
- Promise类会立即执行（excutor 执行器），执行完成后变成 pending 状态，根据用户调用resolve或者reject变成fulfilled或者rejected
- Promise如果变为 fulfilled，不能转化为其他状态，成功的时候会有一个值value
- Promise如果变为 rejected，也不能转换为其他状态，失败的时候也会有一个值reason
- 每个Promise实例上都有一个then方法,then方法包含两个参数，onFulfilled, onRejected 都是函数  
  
- promise 有多个状态，如果成功会让成功的函数依次执行，如果失败会让失败的函数依次执行---发布订阅模式
- then 的链式调用   finnaly all race  和promise的测试库


# 错误捕获
1. 只有同步才能使用try catch捕获错误，异步不能使用try catch捕获错误
2. 异步使用错误事件进行捕获