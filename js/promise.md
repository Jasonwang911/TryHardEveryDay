## Promise 

### Promise的链式调用（如果是一个promise，就不是普通值）
1. 如果then方法中的成功或者失败，至此那个的时候发生错误，就走下一个then的失败的回调
2. 如果then方法返回了一个失败的promise就会走外层then的失败的回调
3. catch是then函数的一个语法糖，相当于then(null, err => {})，一个没有成功回调的then函数
4. then方法返回了一个新的promise
5. resolvePromise 函数
  - 如果promise2和x是同一个对象的引用，则会出现死循环，这时候应该抛出 TypeError 的类型错误，new TypeError(`chaining cycle detected for promise`)  
  - 因为promise的实现方法很多，为了规范和互相调用，需要判断x是不是一个promise，判断方法是看看他有没有then方法
  - 详细实现过程在 history5
6. 值的穿透
  判断then函数中是否传递了onFulfilled, onRejected函数，如果没有传递，直接返回相应的常量或者抛出对应的异常
7. catch方法： 是then函数的一个语法糖,相当于 return this.then(null, errCallback)
8. finnal方法，无论如何都执行，也是then的一个语法糖。callback 是一个异步函数，如果需要等待这个异步执行完成再继续下面的步骤，可以将callback放到promise中用resolve包一下。 koa的原理就是基于这个。 详见 history7    
9. Promise.all 解决多个异步，同步的问题; 实现原理是计数器   
10. Promise.race 一个成功就成功，一个失败就失败，并返回最快的一个的结果  
11. 中断一个promise： 超过多久就中断一个promise： 使用Promise.race 来传入一个自定义的Promise，通过控制自定义的Promise来控制整个流程的继续或者中断  

### 测试是是否符合 Promise A+ 规范： promises-aplus-tests
1. 需要添加一段代码：
```
Promise.defer = Promise.deferred = function() {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}
```

### generator 生成器 迭代器  
- yield 产出
- iterator  generator返回一个迭代器iterator {value: xxx, done: false }  
- throw 抛出错误  

1. 著名的co库