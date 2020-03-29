let str = require('./a')
import logo from './favicon.ico'
// import $ from 'expose-loader?$!jquery'
// import $ from 'jquery'

// console.log('jquery======>', $)

console.log(str)

let fn = () => {
  console.log('jason wang')
}


class A{
  a = 1;
}


// webpack 图片的处理
// 1.在js中创建图片来引入
let image = new Image()

image.src = logo
document.body.appendChild(image)