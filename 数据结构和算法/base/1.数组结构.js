let arr = [1,2,3,4,'jason']

/*
*   Js中的数据结构是浏览器进一步封装好的
*   1.存储任意数据类型
*   2.容量自动缩放
*   3.Array.prototype原型上提供很多供数组实例操作的方法
*/

// 删除指定某一项的优化
// arr.splice(0, 1)
// 在不考虑顺序的情况下，让最后一项替换当前项
arr[1] = arr[arr.length-1]
arr.length--

console.log(arr)