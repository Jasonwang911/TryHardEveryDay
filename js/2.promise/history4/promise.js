const { resolve } = require("path")

// 定义常亮
const SUCCESS = 'fulfilled'
const FAIL = 'rejected'
const PENDING = 'pending'

class Promise{
  constructor(excutor) {   // 执行器
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallback = []
    this.onRejectedCallback = []
    let resolve = (value) => {
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
    let promise2
    promise2 = new Promise((resolve, reject) => {
      if(this.status === SUCCESS) {
        try{
          let x = onFulfilled(this.value)
          resolve(x)
        }catch(err) {
          reject(err)
        }
      }
      if(this.status === FAIL) {
        try{
          let x = onRejected(this.reason)
          resolve(x)
        }catch(err) {
          reject(err)
        }
      }
      if(this.status === PENDING) {
        this.onResolvedCallback.push(() => {
          try{
            let x = onFulfilled(this.value)
            resolve(x)
          }catch(err) {
            reject(err)
          }
        })
        this.onRejectedCallback.push(() => {
          try{
            let x = onRejected(this.reason)
          }catch(err) {
            reject(err)
          }
        })
      }
    })
    return promise2
  }
}

module.exports = Promise