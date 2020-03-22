# JS基础

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