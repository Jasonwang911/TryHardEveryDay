/* 
 * (N-1)+(N-2)+...+1 = N*(N-1)/2 
 * => N^2/2 - N/2
 * => N^2/2 只取最高阶
 * => N^2 去除常量
 * => O(n^2)
 */
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  return arr;
}
Array.prototype.bubble = function bubble() {
  // 外层循环I控制比较的轮数
  let flag = true;
  for (let i = 0; i < this.length - 1; i++) {
      // 里层循环控制每一轮比较的次数J
      for (let j = 0; j < this.length - 1 - i; j++) {
          if (this[j] > this[j + 1]) {
              // 当前项大于后一项，交换位置
              swap(this,j,j+1);
              flag = false;
          }
          if(flag) break
      }
      
  }
  return this;
}
let ary = [12, 8, 24, 16, 1];
ary.bubble();
console.log(ary);