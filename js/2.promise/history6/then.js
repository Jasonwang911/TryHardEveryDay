let Promise = require('./promise')

let p = new Promise((resolve, reject) => {
  reject(1000)
})

// p.then(val => val, err => {
//   throw err
// }).then(val => val, err => {
//   throw err
// }).then(data => {
//   console.log(data)
// }, err => {
//   console.log(err,err)
// })


p.then().then().then((data) => {
  console.log('success', data)
}, err => {
  console.log('err=>', err)
})