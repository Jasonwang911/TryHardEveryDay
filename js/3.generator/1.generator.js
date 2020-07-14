let fs = require('fs').promises
let path = require('path')

function* read() {
  try{
    let content = yield fs.readFile(path.resolve(__dirname, './name.txt'), 'utf8')
    let age = yield fs.readFile(path.resolve(__dirname, `./${content}`), 'utf8')
    return age
  }catch(err) {
    console.log(err)
  }
}

// let it = read()
// let {value} = it.next()
// value.then(function(data) {
//   let {value} = it.next(data)
//   value.then(data => {
//     console.log(data)
//   })
// })

function co(it) {
  return new Promise((resolve, reject) => {
    function next(data) {
      let {value, done} = it.next(data)
      if(!done) {
        Promise.resolve(value).then(data => {
          next(data)
        }, reject)
      }else {
        resolve(value)
      }
    }
    next()
  })
}

// 用co库来操作上面的问题
co(read()).then(data => {
  console.log(data)
})