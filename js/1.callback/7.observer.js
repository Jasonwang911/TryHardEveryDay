/*
 * @Author: Jason wang
 * @Date: 2019-12-25 10:54:23
 * @Descripttion: 观察者模式
 */

// 被观察者
class Subject{
  constructor() {
    this.stack = []
    this.state = '开心'
  }
  // 接收观察者
  attach(observer) {
    this.stack.push(observer)
  }
  // 更新状态
  setState(newState) {
    this.state = newState
    this.stack.forEach(o => o.update(newState))
  }
}

 // 观察者
class Observer{
  constructor(name) {
    this.name = name
  }
  update(newState) {
    console.log(`${this.name}: 宝宝现在${newState}`)
  }
}

let father = new Observer('爸爸')
let mother = new Observer('妈妈')

let baby = new Subject('宝宝')
console.log(`宝宝开始的状态: ${baby.state}`)
baby.attach(father)
baby.attach(mother)

baby.setState('不开心')