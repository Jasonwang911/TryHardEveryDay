// 异步并发的例子   异步的I/O(文件的读写)
let fs = require('fs')
let path = require('path')

function after(times, callback) {
  let school = {}
  return function out(key, value) {
      school[key] = value
      if(--times === 0) {
        callback(school)
      }
  }
}

let out = after(2, (school) => {
  console.log(school)
})
fs.readFile(path.resolve(__dirname, './file/name.txt'), 'utf8', function(err, data) {
  // console.log(data)
  out('name', data)
})
fs.readFile(path.resolve(__dirname, './file/age.txt'), 'utf8', function(err, data) {
  // console.log(data)
  out('age', data)
})