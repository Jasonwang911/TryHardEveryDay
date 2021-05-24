//  在一个有序的数组中插入一个新值
// function insert(A, x)
// A: 已排序的数组
// x: 需要插入的元素
// 返回值： 无


/*
*   js中的原始实现
*/ 
// const A = [2,4,7,9,13]   // 原数组
// const x = 8   // 需要插入的元素
// const b = A.find(a => a > x)   // b代表第一个大于x的数字
// // 处理 b = undefined 代表所有元素都比8小
// // if(b === undefined) {
// //   A.push(x)
// // }else {
// //   const idx = A.indexOf(b)
// //   A.splice(idx, 0, x)
// // }
// // 代码优化如下
// const ids = A.indexOf(b)
// A.splice(ids === -1 ? A.length : idx, 0, x)

// function insert(A, x) {
//   // p指向下一个需要比较的元素
//   // p+1 指向空位
//   let p = A.length - 1
//   // 从最后一项开始比较，如果 A[p] 和 x 做比较，插入条件成立就进行插入，插入条件不成立就向前移动指针
//   while(p >= 0 && A[p] > x) {
//     console.log(A[p+1], A[p])
//     A[p+1] = A[p]
//     p--
//   }
//   // 循环结束或者是条件不成立的终端
//   A[p + 1] = x
// }

// const A = [2,4,7,9,13]
// const x = 1
// insert(A, x) 
// console.log(A)

function insert(A, i, x) {
  let p = i - 1
  while(p >= 0 && A[p] > x) {
    console.log(p, A[p+1], A[p])
    A[p+1] = A[p]
    p--
  }
  A[p + 1] = x
  // 5 [5]
  // i = 1; A[1] = 8; p = 1-1=0  A[p]=5 > 8  [5,8]
  // i = 2; A[2] = 1; p = 2-1=1  A[1]=8 > 1 进循环 A[2] = A[1] p--=0 ==> [5, 1, 8] 再次进入while;  
  // i = 2; A[2] = 8; p = 0 A[0]=5 > 1 再次进入循环 A[1] = A[0] p--=-1 ==> [1, 5, 8]  p不满足循环条件跳出循环
}
 
function insertion_sort(A) {
  for(let i = 0; i < A.length; i++) {   // 主循环执行N-1次
    insert(A, i, A[i])  // 执行次数的常熟C   1~O(n2)次
  }
}

const A = [5, 8, 1, 3, 2, 4, 9]
insertion_sort(A)
console.log(A)

// 为了减少执行次数，如何使用类似二分查找优化插入排序的insert过程，速度会变快么？
