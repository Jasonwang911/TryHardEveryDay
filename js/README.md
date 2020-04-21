# JS基础

## JS的数据类型
数据类型分类
- 基本数据类型
- 引用数据类型
  + object
  + function

数据类型检测
- typeof 检测数据类型的逻辑运算符
  + typeof value  返回当前值的数据类型
  + 返回的结果都是字符串
  + 局限性，typeof null => 'object' ，不能检测对象类型
- instanceof 检测是否为某个类的实例
- constructor  检测构造函数
- Object.prototype.toString.call()

把其他数据类型转换为数字的方法
  + 强转换（基于底层机制转换的） Number()
    + 一些隐式类型转换都是基于Number完成的
      + isNaN('12.5px')
      + 数学运算  
      + 字符串 == 数字  
  + 弱转换 (基于一些额外的方法转化) parseInt()/parseFloat()
```
parseInt('')
Number('')
isNaN('')
parseInt(null)
Number(null)
isNaN(null)
parseInt('12px')
Number('12px')
isNaN('12px')
parseFloat('1.6px') + parseInt('1.2px') + typeof parseInt(null)
isNaN(Number(!!Number(parsetInt('0.8'))))  
typeof !parseInt(null) + !isNaN(null)
```

```
let result = 10 + false + undefined + [] + 'Tencent' + null + true + {}
console.log(result)
10 + undefined  => NaN    undefined是未赋值，是NaN
10 + null => 10     null 是空对象，空指针，所以是 0 
```

### 堆（Heap）栈（Stack）
- 程序运行的时候，需要内存空间存放数据。一般来说,系统会划分出两种不同的内存空间：一种叫做stack(栈)，另一种叫做heap(堆) 
- stack是有结构的，每个区块按照一定次序存放，可以明确知道每个区块的大小
- heap是没有结构的，数据可以任意存放。因此，stack的寻址速度要快于heap
- 只要是局部的、占用空间确定的数据，一般都存放在stack里面，否则就放在heap里面,所有的对象都存放在heap
- 栈是一组数据的存放方式,特点是先进后出，后进先出

### 队列
- 先进先出
- 队列是一种操作受限制的线性表
- 特殊之处在于它只允许在表的前端进行删除操作，而在表的后端进行插入操作
- 进行插入操作的端称为队尾，进行删除操作的端称为队头
- 因为队列只允许在一端插入,在另一端删除，所以只有最早进入队列的元素才能最先从队列中删除,故队列又称为先进先出线性表

### 执行上下文  
- 当函数运行时，会创建一个执行环境，这个执行环境就叫执行上下文(Execution Context)
- 执行上下文中会创建一个对象叫作变量对象(Variable Object),基础数据类型都保存在变量对象中
- 引用数据类型的值保存在堆里，我们通过操作对象的引用地址来操作对象

1. 复制
- 基本数据类型复制的是值本身
- 引用数据类型复制的是引用地址指针

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

### 深拷贝
```
function deepClone(obj) {
  function isObject(o) {
    return (typeof o === 'object' || typeof o === 'function') && o !== null
  }

  if (!isObject(obj)) {
    throw new Error('非对象')
  }

  let isArray = Array.isArray(obj)
  let newObj = isArray ? [...obj] : { ...obj }
  Reflect.ownKeys(newObj).forEach(key => {
    newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
  })

  return newObj
}

let obj = {
  a: [1, 2, 3],
  b: {
    c: 2,
    d: 3
  }
}
let newObj = deepClone(obj)
newObj.b.c = 1
console.log(obj.b.c) // 2
```

### MessageChannel ?
- 利用MessageChannel实现深拷贝
```
function structuralClone(obj) {
  return new Promise(resolve => {
    const { port1, port2 } = new MessageChannel()
    port2.onmessage = ev => resolve(ev.data)
    port1.postMessage(obj)
  })
}

var obj = {
  a: 1,
  b: {
    c: 2
  }
}

obj.b.d = obj.b

// 注意该方法是异步的
// 可以处理 undefined 和循环引用对象
const test = async () => {
  const clone = await structuralClone(obj)
  console.log(clone)
}
test()
```

### Reflect.ownKeys(newObj) ?


### __proto__ 
其实每个 JS 对象都有 __proto__ 属性，这个属性指向了原型。这个属性在现在来说已经不推荐直接去使用它了，这只是浏览器在早期为了让我们访问到内部属性 [[prototype]] 来实现的一个东西。   
原型也是一个对象，并且这个对象中包含了很多函数，所以我们可以得出一个结论：对于 obj 来说，可以通过 __proto__ 找到一个原型对象，在该对象中定义了很多函数让我们来使用。   
打开 constructor 属性我们又可以发现其中还有一个 prototype 属性，并且这个属性对应的值和先前我们在 __proto__ 中看到的一模一样。所以我们又可以得出一个结论：原型的 constructor 属性指向构造函数，构造函数又通过 prototype 属性指回原型，但是并不是所有函数都具有这个属性，Function.prototype.bind() 就没有这个属性。   
原型链就是多个对象通过 __proto__ 的方式连接了起来。为什么 obj 可以访问到 valueOf 函数，就是因为 obj 通过原型链找到了 valueOf 函数。   
- Object 是所有对象的爸爸，所有对象都可以通过 __proto__ 找到它
- Function 是所有函数的爸爸，所有函数都可以通过 __proto__ 找到它
- 函数的 prototype 是一个对象
- 对象的 __proto__ 属性指向原型， __proto__ 将对象和原型连接起来组成了原型链


### 继承
1. 组合继承 
```
function Parent(value) {
  this.val = value
}
Parent.prototype.getValue = function() {
  console.log(this.val)
}
function Child(value) {
  Parent.call(this, value)
}
Child.prototype = new Parent()

const child = new Child(1)

child.getValue() // 1
child instanceof Parent // true
```

### call和apply 
1. 定义： 每个函数都包含两个非继承而来的方法：call()方法和apply()方法。   
2. call和apply可以用来重新定义函数的执行环境，也就是this的指向；call和apply都是为了改变某个函数运行时的context，即上下文而存在的，换句话说，就是为了改变函数体内部this的指向。  
3. 语法： 
- call(): 调用一个对象的方法，用另一个对象替换当前对象，可以继承另外一个对象的属性
```
Function.call(obj[, param1[, param2[, [,...paramN]]]]);
```
obj：这个对象将代替Function类里this对象   
params：一串参数列表   
说明：call方法可以用来代替另一个对象调用一个方法，call方法可以将一个函数的对象上下文从初始的上下文改变为obj指定的新对象，如果没有提供obj参数，那么Global对象被用于obj。  
- apply()： 和call()方法一样，只是参数列表不同
```
Function.apply(obj[, argArray]);
```
obj：这个对象将代替Function类里this对象    
argArray：这个是数组，它将作为参数传给Function   
说明：如果argArray不是一个有效数组或不是arguments对象，那么将导致一个TypeError，如果没有提供argArray和obj任何一个参数，那么Global对象将用作obj。   
4. 相同点： call()和apply()方法的相同点就是这两个方法的作用是一样的。都是在特定的作用域中调用函数，等于设置函数体内this对象的值，以扩充函数赖以运行的作用域。   
5. 总结一句话就是call()可以让括号里的对象来继承括号外函数的属性。  


### 模块化 
####   为什么要使用模块化？都有哪几种方式可以实现模块化，各有什么特点？
1. 立即执行函数
```
(function(globalVariable){
   globalVariable.test = function() {}
   // ... 声明各种变量、函数都不会污染全局作用域
})(globalVariable)
```
2. AMD 和 CMD
```
// AMD
define(['./a', './b'], function(a, b) {
  // 加载模块完毕可以使用
  a.do()
  b.do()
})
// CMD
define(function(require, exports, module) {
  // 加载模块
  // 可以把 require 写在函数体的任意地方实现延迟加载
  var a = require('./a')
  a.doSomething()
})
```
3. CommonJS
CommonJS 最早是 Node 在使用，目前也仍然广泛使用，比如在 Webpack 中你就能见到它，当然目前在 Node 中的模块管理已经和 CommonJS 有一些区别了。  
```
// a.js
module.exports = {
    a: 1
}
// or 
exports.a = 1

// b.js
var module = require('./a.js')
module.a // -> log 1
```
- require
```
var module = require('./a.js')
module.a 
// 这里其实就是包装了一层立即执行函数，这样就不会污染全局变量了，
// 重要的是 module 这里，module 是 Node 独有的一个变量
module.exports = {
    a: 1
}
// module 基本实现
var module = {
  id: 'xxxx', // 我总得知道怎么去找到他吧
  exports: {} // exports 就是个空对象
}
// 这个是为什么 exports 和 module.exports 用法相似的原因
var exports = module.exports 
var load = function (module) {
    // 导出的东西
    var a = 1
    module.exports = a
    return module.exports
};
// 然后当我 require 的时候去找到独特的
// id，然后将要使用的东西用立即执行函数包装下，over
```
另外虽然 exports 和 module.exports 用法相似，但是不能对 exports 直接赋值。因为 var exports = module.exports 这句代码表明了 exports 和 module.exports 享有相同地址，通过改变对象的属性值会对两者都起效，但是如果直接对 exports 赋值就会导致两者不再指向同一个内存地址，修改并不会对 module.exports 起效。   

4. ES Module
- CommonJS 支持动态导入，也就是 require(${path}/xx.js)，后者目前不支持，但是已有提案
- CommonJS 是同步导入，因为用于服务端，文件都在本地，同步导入即使卡住主线程影响也不大。而后者是异步导入，因为用于浏览器，需要下载文件，如果也采用同步导入会对渲染有很大影响
- CommonJS 在导出时都是值拷贝，就算导出的值变了，导入的值也不会改变，所以如果想更新值，必须重新导入一次。但是 ES Module 采用实时绑定的方式，导入导出的值都指向同一个内存地址，所以导入值会跟随导出值变化
- ES Module 会编译成 require/exports 来执行的
```
// 引入模块 API
import XXX from './a.js'
import { XXX } from './a.js'
// 导出模块 API
export function a() {}
export default function() {}
```

5. Proxy: Proxy 是 ES6 中新增的功能，它可以用来自定义对象中的操作。
```
let p = new Proxy(target, handler)
```
target 代表需要添加代理的对象，handler 用来自定义对象中的操作，比如可以用来自定义 set 或者 get 函数。   
使用Proxy来实现一组相应数据    
```
let onWatch = (obj, setBind, getLogger) => {
  let handler = {
    get(target, property, receiver) {
      getLogger(target, property)
      return Reflect.get(target, property, receiver)
    },
    set(target, property, value, receiver) {
      setBind(value, property)
      return Reflect.set(target, property, value)
    }
  }
  return new Proxy(obj, handler)
}

let obj = { a: 1 }
let p = onWatch(
  obj,
  (v, property) => {
    console.log(`监听到属性${property}改变为${v}`)
  },
  (target, property) => {
    console.log(`'${property}' = ${target[property]}`)
  }
)
p.a = 2 // 监听到属性a改变
p.a // 'a' = 2
```

