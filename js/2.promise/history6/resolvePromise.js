let Promise = require('./promise')

let p = new Promise((resolve, ) => {
  resolve(new Promise((resolve, reject) => {
    resolve(new Promise((resolve, reject) => {
      resolve(100)
    }))
  }))
})

p.then(res => {
  console.log(res)
})