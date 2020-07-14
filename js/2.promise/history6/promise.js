const { resolve } = require("path")

// 定义常量
const SUCCESS = 'fulfilled'
const FAIL = 'rejected'
const PENDING = 'pending'

function resolvePromise(promise2, x, resolve, reject) {
  // 1. 如果promise2和x是同一个对象的引用，则会出现死循环，这时候应该抛出 TypeError 的类型错误，原生promise的错误详见type.js
  // If promise and x refer to the same object, reject promise with a TypeError as the reason.  
  if(promise2 === x) {
    return reject(new TypeError(`chaining cycle detected for promise`))
  }
  // 标识resolvePromise和rejectPromise的resolve和reject只能调用一次的开关
  let called
  // promise有n种实现，都需要符合promiseA+规范，方便互相调用
  // 判断x是不是一个promise： 看他是否有then方法
  if(typeof x === 'function' || (typeof x === 'object' && x != null)) {
    // 为了防止  对象get方法上抛出异常，需要try-catch  x的then方法
    try{
      let then = x.then
      if(typeof then === 'function') {
        // then.call(x) 和 x.then() 相同，但是因为此时是多次取 then，为了防止多次取值不相同，所以 then.call(x) 能保证是用第一次then的取值进行调用的
        // If/when resolvePromise is called with a value y, run [[Resolve]](promise, y). 
        // 此处需要递归调用，用来规避在 resolve中继续使用promise
        then.call(x, y => {
          if(called) return 
          called = true
          resolvePromise(promise2, y, resolve, reject)
        }, r => {
          if(called) return 
          called = true
          reject(r)
        })
      }else {
        resolve(x)
      }
    }catch(e) {
      if(called) return 
      called = true
      reject(e)
    }
  }else {
    // 不是函数或者对象，表明是常亮
    resolve(x)
  }
}

class Promise{
  constructor(excutor) {   // 执行器
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallback = []
    this.onRejectedCallback = []
    let resolve = (value) => {
      if(value instanceof Promise) {   // resolve的结果是一个promise,会将这个promise执行，并返回promise的结果
        return value.then(resolve,reject)
      }
      if(this.status === PENDING) {
        this.value = value
        this.status = SUCCESS
        this.onResolvedCallback.forEach(fn => fn())
      }
    }
    let reject = (reason) => {
      this.reason = reason
      this.status = FAIL
      this.onRejectedCallback.forEach(fn => fn())
    }
    try{
      excutor(resolve, reject)
    }catch(e) {
      reject(e)
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ?  onFulfilled : val => val
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err}
    let promise2
    promise2 = new Promise((resolve, reject) => {
      if(this.status === SUCCESS) {
        // 定时器是为了在resolvePromise中拿到正确的promise2
        setTimeout(() => {
          try{
            let x = onFulfilled(this.value)
            // resolve(x)
            resolvePromise(promise2, x, resolve, reject)
          }catch(err) {
            reject(err)
          }
        })
      }
      if(this.status === FAIL) {
        setTimeout(() => {
          try{
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          }catch(err) {
            reject(err)
          }
        })
      }
      if(this.status === PENDING) {
        this.onResolvedCallback.push(() => {
          setTimeout(() => {
            try{
              let x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            }catch(err) {
              reject(err)
            }
          })
        })
        this.onRejectedCallback.push(() => {
          setTimeout(() => {
            try{
              let x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            }catch(err) {
              reject(err)
            }
          })
        })
      }
    })
    return promise2
  }

  catch(errCallback) {  // 用来捕获错误
    return this.then(null, errCallback)
  }
}

Promise.defer = Promise.deferred = function() {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

module.exports = Promise