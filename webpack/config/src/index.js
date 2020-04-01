/*
 * @Author: Jason wang
 * @Date: 2020-03-30 10:02:58
 * @Descripttion: 
 * @version: 
 */
import './index.css'
// import 'bootstrap'
console.log('home')

let url = ''

if(DEV) {
  url = 'http://127.0.0.1:3000'
}else {
  url = 'http://www.wangshen.top'
}

console.log(url, '=======================')

class Log{
  constructor() {
    console.log('出错了1')
  }
}

let log = new Log();

let xhr = new XMLHttpRequest()
xhr.open('GET', '/api/user', true)
xhr.onload = function() {
  console.log(xhr.response)
}
xhr.send()