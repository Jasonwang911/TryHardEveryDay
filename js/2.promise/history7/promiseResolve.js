let Promise = require('./promise')

Promise.resolve = function(value) {
  return new Promise((resolve, reject) => {
    resolve(value)
  })
}

// callback 是一个异步函数，如果需要等待这个异步执行完成再继续下面的步骤，可以将callback放到promise中用resolve包一下。 koa的原理就是基于这个, resolve有等待的效果
Promise.prototype.finally = function(callback) {
  return this.then((data) => {
    return Promise.resolve(callback()).then(() => data)
    // return new Promise((resolve, reject) => {
    //   resolve(callback())
    // }).then(() => data)
  }, (err) => {
    return Promise.resolve(callback()).then(() => {throw err})
    // return new Promise((resolve, reject) => {
    //   resolve(callback())
    // }).then(() => {throw err})
  })
}
 

new Promise((resolve, reject) => {
  reject(100)
}).finally(() => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('finally')
      resolve()
    }, 3000)
  })
}).then(data => {
  console.log('data', data)
}, (err) => {
  console.log('err', err)
})