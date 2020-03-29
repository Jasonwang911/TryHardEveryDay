let str = require('./a')
// import $ from 'expose-loader?$!jquery'
import $ from 'jquery'

console.log('jquery======>', $)

console.log(str)

let fn = () => {
  console.log('jason wang')
}


class A{
  a = 1;
}