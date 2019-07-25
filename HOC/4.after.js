// loadsh 中的after函数： 在执行了多少次之后再执行
// 高阶函数after, 可以做异步的并发处理
function after(times, callback) {
  // 使用了闭包的概念，维护times
  return function() {
    if (--times === 0) {
      callback();
    }
  };
}

let fn = after(3, () => {
  console.log("执行了三次之后才执行");
});

fn();
fn();
fn();
