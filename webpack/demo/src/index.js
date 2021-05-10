// import './style/index.css'
// import './style/less.less'
// import './style/scss.scss'

// console.log(1)
// console.log('js文件中', process.env.NODE_ENV)

// let logo = require('./assets/vue.webp')
// let image = new Image()
// image.src = logo
// document.body.append(image)

// let sum = (a,b) => a+b

// console.log(sum(1,2))

// import React from 'react'
// import ReactDOM from 'react-dom'

// ReactDOM.render(<h1>hello</h1>, document.getElementById('root'))

function readonly(target, key, descriptor) {
  descriptor.writable = false
}
class Person {
  @readonly PI = 3.14
}

let p = new Person()
p.PI = 3.15
console.log(p)