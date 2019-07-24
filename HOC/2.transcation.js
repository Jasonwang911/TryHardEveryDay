// react 中的事务
class Transaction {
  preform(anyMethod, wrappers) {
    wrappers.forEach(wrapper => wrapper.initialize());
    anyMethod();
    wrappers.forEach(wrapper => wrapper.close());
  }
}

let transaction = new Transaction();

let oldFunc = () => {
  console.log("原有的函数");
};

transaction.preform(oldFunc, [
  {
    // wrapper
    initialize() {
      console.log("初始化1");
    },
    close() {
      console.log("关闭1");
    }
  },
  {
    // wrapper
    initialize() {
      console.log("初始化2");
    },
    close() {
      console.log("关闭2");
    }
  }
]);
