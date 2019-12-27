/*
 * @Author: Jason wang
 * @Date: 2019-12-24 11:30:33
 * @Descripttion: React中的事务: 典型的AOP面向切片和高阶函数
 */

class Transaction {
  preform(anyMethod, warppers) {
    let warppersIsArr = Array.isArray(warppers)
    warppersIsArr ? warppers.forEach(warpper => warpper.initialize()) : warppers.initialize()
    anyMethod()
    warppersIsArr ? warppers.forEach(warpper => warpper.close()) : warppers.close()
  }
}

let transaction = new Transaction()

let oldFunc = () => {
  console.log('原有函数 anyMethod')
}

/**
 * @name: 事务函数
 * @oldFunc {Function} 原函数 
 * @warppers {Object|Array} 包裹对象  {initialize,close}
 * @return: 
 */
transaction.preform(oldFunc, [
  {
    initialize() {
      console.log('初始化1')
    },
    close() {
      console.log('关闭1')
    }
  },
  {
    initialize() {
      console.log('初始化2')
    },
    close() {
      console.log('关闭2')
    }
  }
])

transaction.preform(oldFunc,{
  initialize() {
    console.log('初始化1')
  },
  close() {
    console.log('关闭1')
  }
})