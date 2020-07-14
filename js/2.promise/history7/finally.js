let Promise = require('./promise')


// callback 是一个异步函数，如果需要等待这个异步执行完成再继续下面的步骤，可以将callback放到promise中用resolve包一下。 koa的原理就是基于这个
Promise.prototype.finally = function(callback) {
  return this.then((data) => {
    return new Promise((resolve, reject) => {
      resolve(callback())
    }).then(() => data)
    // callback()
    // return data
  }, (err) => {
    return new Promise((resolve, reject) => {
      resolve(callback())
    }).then(() => {throw err})
    // callback()
    // throw err
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