// loadsh after: 在执行多少次以后再执行， 典型的偏函数的概念 做异步的并发处理
function after(times, callback) {
  return function() {
    if(--times === 0) {
      callback()
    }
  }
}

let fn = after(3, () => {
  console.log(`已经执行了三次`)
})

fn()
fn()
fn()