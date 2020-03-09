/*
 * @Author: Jason wang
 * @Date: 2020-03-09 14:38:51
 * @Descripttion: 
 * @version: 
 */

class Stack {
  private items: number[] = [];
  // 添加元素到栈顶，也就是栈的末尾
  push(element: number) {
      this.items.push(element);
  }
  // 栈的后进先出原则，从栈顶出栈
  pop(): number {
      return this.items.pop();
  }
}

let stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.pop());