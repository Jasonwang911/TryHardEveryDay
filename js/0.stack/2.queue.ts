class Queue {
  private items: number[] = [];
  // 添加元素到栈顶，也就是栈的末尾
  enqueue(element: number) {
    this.items.push(element);
  }
  dequeue() {
    return this.items.shift();
  }
}

let queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log(queue.dequeue());//1