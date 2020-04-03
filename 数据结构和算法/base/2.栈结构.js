class Stack {
  constructor() {
    this.container = []
  } 
  enter(element) {
    this.container.unshift(element)
    console.log('进栈成功', `进栈的数据是： ${element}`,this.container)
  }
  leave() {
    return this.container.shift()
  }
  size() {
    return this.container.length
  }
  value() {
    return this.container
  }
}

// let stack = new Stack()
// stack.enter('jason')

// 把十进制数字转为二进制
let num = 58 
console.log(num.toString(2))
Number.prototype.decimal2binary = function(){
  let sk = new Stack();
  let decimalNum = this.valueOf();
  while(decimalNum>0) {
    sk.enter(decimalNum%2)
    decimalNum = Math.floor(decimalNum/2);
  }
  return sk.value().join('')
}
console.log(num.decimal2binary())



