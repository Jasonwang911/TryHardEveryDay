/*
 * @Author: Jason wang
 * @Date: 2019-12-26 13:55:29
 * @Descripttion: 手写一个遵循Promise A+规范的Promise  以下只是同步
 */
const SUCCESS = 'fulfilled'
const FAIL = 'rejected'
const PENDING = 'pending'

class Promise {
  // new Promise的时候传入了一个函数：excutor执行器
  constructor(excutor) {
    // 状态： pending fulfilled rejected
    this.status = PENDING
    // 成功的时候的值
    this.value = undefined
    // 失败的时候的值
    this.reason = undefined
    // excutor内部有两个参数 resolve和reject，每个实例都有
    let resolve = (value) => {
      if(this.status === PENDING) {
        this.value = value
        this.status = SUCCESS
      }
    }
    let reject = (reason) => {
      if(this.status === PENDING) {
        this.reason = reason
        this.status = FAIL
      }
    }
    excutor(resolve, reject)
  }
  // 每个Promise实例上都有一个then方法
  then(onFulfilled, onRejected) {
    if(this.status === SUCCESS ) {
      onFulfilled(this.value)
    }
    if(this.status === FAIL) {
      onRejected(this.reason)
    }
  }
}

module.exports = Promise