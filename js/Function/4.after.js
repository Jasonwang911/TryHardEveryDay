/*
 * @Author: Jason wang
 * @Date: 2019-12-24 15:28:22
 * @Descripttion: loadsh 中 after 函数  ---- 在执行多少次后再执行（典型的偏函数的概念）
 *  可以做异步的并发处理
 */

/**
 * @name: after偏函数
 * @msg: 函数执行多少次再执行
 * @times {Number} 
 * @callback {Function} 
 * @return: Function
 */
function after(times, callback) {
  // 将times临时存入闭包中先不销毁
  return () => {
    if(--times === 0) {
      callback()
    }
  }
}

// 高阶函数，函数的返回值还是一个函数  
let fn = after(3, () => {
  console.log('已经执行了三次')
})

fn()
fn()
fn()
