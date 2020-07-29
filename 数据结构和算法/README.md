# 前端基础算法

### 前端算法总结博客文章推荐
https://www.cnblogs.com/kbnet/

## 几种使用的基础数据结构
数据结构是计算机存储、组织数据的方式；算法是解决问题的方法、步骤和策略。
- 有穷性：必须能在执行有限个步骤之后终止
- 确切性：每一步有确切的定义
- 输入项：有0个或多个输入，以反映对输入数据加工后的结果
- 输出项：有一个或多个输出，以反映对输入数据加工后的结果
- 可行性：每个计算步骤都可以再优先时间内完成

## 基础的数据结构（线性结构和非线性结构）
- 基础的：数组、栈、堆、队列
- 复杂的：链表、树结构、散列表（哈希结构）、图结构

### 数组结构
- Js中的数据结构是浏览器进一步封装好的
1. 存储任意数据类型
2. 容量自动缩放
3. Array.prototype原型上提供很多供数组实例操作的方法

- 优点
1. 基于索引直接进行查找和获取，效率高
2. 进行中间插入和删除操作的时候，性能非常低（数组的塌陷和删除中间项的优化）

- 数组中常用的方法
能自己封装数组中的常用迭代方法   

### 栈结构（Stack) -- 栈是水桶，队列是管道
- 后进先出(LIFO -- last in first out)，新进栈的永远放到栈的顶部；出栈只能把栈顶部的内容先出栈。
- 闭包作用域


### 队列结构 
- 先进先出（FIFO -- first in first out）,新进入的添加到后面，移除队列移除的是第一个。
- 优先级队列--宏任务，微任务

1. 面试题： 击鼓传花

### 大O标识法和时间复杂度
- 度量一个程序的执行时间通常有两种方法
 事后统计方法   
 事前分析估算的方法 O   
```
Ο(1)＜Ο(log2n)＜Ο(n)＜Ο(n2)＜Ο(n3)＜…＜Ο(2n)
```

1.  Ο(1)：如果算法的执行时间不随着问题规模n的增加而增长，即使算法中有上千条语句，其执行时间也不过是一个较大的常数
```
let a=12;
let b=13;
let temp=a;
a=b;
b=temp;
```

2. Ο(log2n)：当数据增大 n 倍时，耗时增大 logn 倍（这里的 log 是以 2 为底的，比如，当数据增大 256 倍时，耗时只增大 8 倍）
```
let i=1;
while(i<=n){
    i*=2;
}
```

3. Ο(n)：数据量的增大几倍，耗时也增大几倍
```
for(i=1;i<=n;i++){
    ...
}
```

4. Ο(n2)：数据量增大 n 倍时，耗时增大 n 的平方倍
```
for(i=1;i<=n;i++){
    for(j=1;j<=n;j++){
        ...
    }
}
```

### 冒泡排序 O(n2)  
思想： 每次都让当前值和后一项进行比较，如果当前值大于后一项值就让两者交换位置。   
      每一轮完成，当前数组的最大值就放到了末尾。只需要把arr.length-1个数字分别放到末尾即可。    

```
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
    for (let i = 0; i < this.length - 1; i++) {
        // 里层循环控制每一轮比较的次数J
        for (let j = 0; j < this.length - 1 - i; j++) {
            if (this[j] > this[j + 1]) {
                // 当前项大于后一项，交换位置
                swap(this,j,j+1);
            }
        }
    }
    return this;
}
let ary = [12, 8, 24, 16, 1];
ary.bubble();
console.log(ary);
```

### 选择排序
假设第一个值是最小值，用后面的每一项和假设的值比较，如果有比他还小的，替换假设的值。
```
Array.prototype.select = function select() {
    for (let j = 0; j < this.length - 1; j++) {
        let min = j,
            temp = null;
        // 找到比当前项还小的这一项索引
        for (let i = min + 1; i < this.length; i++) {
            if (this[i] < this[min]) {
                min = i;
            }
        }
        // 让最小的项和当前首位交换位置
        swap(this,min,j);
    }
    return this;
};
let ary = [12, 8, 24, 16, 1];
ary.select();
console.log(ary);
```

### 插入排序 O(n2)

```
Array.prototype.insert = function insert() {
    // 1.准备一个新数组，用来存储抓到手里的牌，开始先抓一张牌进来
    let handle = [];
    handle.push(this[0]);

    // 2.从第二项开始依次抓牌，一直到把台面上的牌抓光
    for (let i = 1; i < this.length; i++) {
        // A是新抓的牌
        let A = this[i];
        // 和HANDDLE手里的牌依次比较（从后向前比）
        for (let j = handle.length - 1; j >= 0; j--) {
            // 每一次要比较的手里的牌
            let B = handle[j];
            // 如果当前新牌A比要比较的牌B大了，把A放到B的后面
            if (A > B) {
                handle.splice(j + 1, 0, A);
                break;
            }
            // 已经比到第一项，我们把新牌放到手中最前面即可
            if (j === 0) {
                handle.unshift(A);
            }
        }
    }
    return handle;
}
let ary = [12, 8, 24, 16, 1];
ary.insert();
console.log(ary);
```

### 希尔排序 O(n1.3)
间隔某些项进行比较
```
Array.prototype.shell = function shell() {
    let gap = Math.floor(this.length / 2);
    while (gap >= 1) {
        for (let i = gap; i < this.length; i++) {
            while (i - gap >= 0 && this[i] < this[i - gap]) {
                swap(this, i, i - gap);
                i = i - gap;
            }
        }
        gap = Math.floor(gap / 2);
    }
};
let arr = [58, 23, 67, 36, 40, 46, 35, 28, 20, 10];
arr.shell();
console.log(arr);
```

### 快速排序 O(n*log2n) 
```
Array.prototype.quick = function quick() {
    // 4.结束递归（当数组中小于等于一项，则不用处理）
    if (this.length <= 1) {
        return this;
    }
    // 1.找到数组的中间项，在原有的数组中把它移除
    let middleIndex = Math.floor(this.length / 2);
    let middleValue = this.splice(middleIndex, 1)[0];
    // 2.准备左右两个数组，循环剩下数组中的每一项，比当前项小的放到左边数组中，反之放到右边数组中
    let aryLeft = [],
        aryRight = [];
    for (let i = 0; i < this.length; i++) {
        let item = this[i];
        item < middleValue ? aryLeft.push(item) : aryRight.push(item);
    }
    // 3.递归方式让左右两边的数组持续这样处理，一直到左右两边都排好序为止（最后让左边+中间+右边拼接成为最后的结果）
    return quick(aryLeft).concat(middleValue, quick(aryRight));
}
let ary = [12, 8, 15, 16, 1, 24];
ary.quick();
console.log(ary);
```
