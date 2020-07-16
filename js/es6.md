### let && const 
- 尽量使用const，如果这个值需要更改才是用let
- var 生命变量，生命到去厍，会污染全局变量
- 变量提升 可以在生命之前调用  function var import
- let const 可以和 {} 方式来连用，产生块级作用域
- var 能重复声明
- let const 不会挂在到windows上，只会挂载到当前作用域

### Symbol 独一无二 
```
const s1 = Symbol()
const s2 = Symbol()
console.log(s1 === s2)   // false
```
1. Symbol()  可以接受一个描述符，描述符会被toString，所以一般放字符串
2. Symbol() 是不可枚举的，也就是不可以循环，一般Symbol都是做为系统属性，不希望被枚举,只能通过 Object.getOwnPropertySymbols(obj) 获取
3. Symbol.for 如果没有回新声明，如果没有并不会重新声明
```
let s3 = Symbol.for('xxx')
let s4 = Symbol.for('xxx')
console.log(s3 === s4)   // true
```
4. Symbol.keyFor(symbol)  可以测试js中的原始数据类型 string number boolean null  undefined symbol
5. Symbol具备原编程的功能，想改变默认系统的方法可以使用 11种
6. 可以做私有属性

### 解构赋值 
```
let {length} = []
```
1. 将类数组转化成数组  Array.form() 和  [...{}] 。但是二者的原理不同，Array.from() 是通过长度和下标来生成数组的，  [...{}] 解构赋值是通过迭代器来实现的
```
[...{0:1, 1:2,length:2,[Symbol.iterator]() {
  let i = 1
  return {
    next() {
      return {value: 1, done: ++i === 5}
    }
  }
}}]
```