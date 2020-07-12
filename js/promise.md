## Promise 

### Promise的链式调用（如果是一个promise，就不是普通值）
1. 如果then方法中的成功或者失败，至此那个的时候发生错误，就睡走下一个then的失败的回调
2. 如果then方法返回了一个失败的promise就会走外层then的失败的回调
3. catch是then函数的一个语法糖，相当于then(null, err => {})，一个没有成功回调的then函数
4. then方法返回了一个新的promise
5. resolvePromise 函数
  - 如果promise2和x是同一个对象的引用，则会出现死循环，这时候应该抛出 TypeError 的类型错误，new TypeError(`chaining cycle detected for promise`)  
  - 因为promise的实现方法很多，为了规范和互相调用，需要判断x是不是一个promise，判断方法是看看他有没有then方法
  - 详细实现过程在 history5
6. 值的穿透
  判断then函数中是否传递了onFulfilled, onRejected函数，如果没有传递，直接返回相应的常量或者抛出对应的异常

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