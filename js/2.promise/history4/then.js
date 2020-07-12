let Promise = require('./promise')
let fs = require('fs')

function read(filePath) {
  return new Promise((resolve, reject) => {
    resolve(1)
  })
}

let promise2 = read('./name.txt').then(function(data) {
  throw new Error('promise2 err')
}, function() {
  throw 'promise fail'
})

promise2.then(data => {
  console.log(data)
}, err => {
  console.log('err', err)
})

// let p = new Promise((resolve, reject) => {
//   // resolve('有钱')
//   fs.readFile('./name.txt', 'utf8', function(err,data) {
//     if(err) {
//       reject(err)
//     }
//     resolve(data)
//   })
// })
// p.then(res => {
//   console.log(res)
// }, err => {
//   console.log('then 抛出错误', err)
// })