/*
 * @Author: Jason wang
 * @Date: 2020-03-30 10:02:58
 * @Descripttion: 
 * @version: 
 */
import './index.css'
// import 'bootstrap'
console.log('home')


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