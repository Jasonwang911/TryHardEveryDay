let Promise = require('./promise')
let fs = require('fs')
let path = require('path')

function read(url) {
  // 延迟对象，减少套用：Q库
  let defer = Promise.defer()
  let file = path.resolve(__dirname,url)
  fs.readFile(file, 'utf8', function(err, data) {
    if(err) defer.reject(err) 
    defer.resolve(data)
  })
  return defer.promise
}

read('./name.txt').then(data => {
  console.log(data)
})