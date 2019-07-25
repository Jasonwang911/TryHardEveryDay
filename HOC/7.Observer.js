// 观察者模式 vue、vuex
// 被观察者
class Subject {
  constructor() {
    this.stack = [];
    this.state = "开心";
  }
  attach(observer) {
    this.stack.push(observer);
  }
  setState(newState) {
    this.state = newState;
    this.stack.forEach(o => o.update(newState));
  }
}

// 观察者
class Observer {
  constructor(name) {
    this.name = name;
  }
  update(newState) {
    console.log(`${this.name}: 小宝宝${newState}`);
  }
}

let o1 = new Observer("爸爸");
let o2 = new Observer("妈妈");

let s = new Subject("小爸爸");
s.attach(o1);
s.attach(o2);
s.setState("不开心");
