class Queue {
  constructor() {
    this.container = []
  } 
  enter(element) {
    this.container.push(element)
    console.log('进入队列', `进队列的数据是： ${element}`,this.container)
  }
  leave() {
    return this.container.shift()
  }
  size() {
    return this.container.length
  }
  value() {
    return this.container
  }
}

// 击鼓传花
function game(n, m) {
  let qe = new Queue()
  // 放入队列
  for(let i = 0; i < n; i++) {
    qe.enter(i + 1)
  }
  while(qe.size() > 1) {
    // 不移除的放到对伟
    for(let i = 0; i < m - 1; i++) {
      qe.enter(qe.leave())
    }
    qe.leave()
  }
  return qe.value().toString()
}

console.log(game(5, 3))