// node 10 新增的，可以将fs转为promise
let fs = require('fs').promises
let path = require('path')

// fs.readFile(path.resolve(__dirname, './name.txt'), 'utf8').then(data => {
//   console.log(data)
// })

function isPromise(value) {
  if(typeof value === 'function' || (typeof value === 'object' && value != null)) {
    if(typeof value.then === 'function') {
      return true
    }
  }
  return false
}

Promise.all = function(values) {
  return new Promise((resolve, reject) => {
    let result = []
    let i = 0
    let processData = (key, value) => {
      result[key] = value
      if(++i === values.length) {
        resolve(result)
      }
    }
    for(let i = 0; i < values.length; i++) {
      let current = values[i]
      // 判断是否是 Promise ， 如果是获取then的结果，如果不是，直接返回
      if(isPromise(current)) {
        current.then(y => {
          processData(i, y)
        }, reject)
      }else {
        processData(i, current)
      }
    }
  })
}

Promise.race = function(values) {
  return new Promise((resolve, reject) => {
    for(let i = 0; i < values.length; i++) {
      let current = values[i]
      // 判断是否是 Promise ， 如果是获取then的结果，如果不是，直接返回
      if(isPromise(current)) {
        current.then(resolve, reject)
      }else {
        resolve(current)
      }
    }
  })
}

Promise.all([
  fs.readFile(path.resolve(__dirname, './name.txt'), 'utf8'),
  fs.readFile(path.resolve(__dirname, './age.txt'), 'utf8'),
  1,
  2
]).then(data => {
  console.log(data)
})

Promise.race([
  fs.readFile(path.resolve(__dirname, './name.txt'), 'utf8'),
  fs.readFile(path.resolve(__dirname, './age1.txt'), 'utf8')
]).then(data => {
  console.log(data)
}, err=> {
  console.log('err', err)
})