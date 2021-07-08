// 斐波那契数，通常用 F(n) 表示，形成的序列称为 斐波那契数列 。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是：

// F(0) = 0，F(1) = 1
// F(n) = F(n - 1) + F(n - 2)，其中 n > 1
// 给你 n ，请计算 F(n) 。

//  

// 示例 1：

// 输入：2
// 输出：1
// 解释：F(2) = F(1) + F(0) = 1 + 0 = 1
// 示例 2：

// 输入：3
// 输出：2
// 解释：F(3) = F(2) + F(1) = 1 + 1 = 2
// 示例 3：

// 输入：4
// 输出：3
// 解释：F(4) = F(3) + F(2) = 2 + 1 = 3
//  

// 提示：

// 0 <= n <= 30

//  递归  + 记忆化    recursion + memoization

const n = 4

var fib = function(n) {
  if(n <= 1) return n
  let prev2 = 0 
  let prev1 = 1
  let result = 0
  for(let i = 2; i <= n; i++) {
    result = prev2 + prev1
    prev2 = prev1
    prev1 = result 
  }
  return result 
}

// var fib = function(n) {
//   if(n <= 1) return n
//   let cache = []
//   cache[0] = 0 
//   cache[1] = 1
//   for(let i = 2; i <= n; i++) {
//     cache[i] = cache[i-1] + cache[i-2]
//   }

//   return cache[n]
// }

// var fib = function(n) {
//   if(n <= 1) return n

//   let cache = []
//   cache[0] = 0
//   cache[1] = 1

//   function memoize(number) {
//     if(cache[number] !== undefined) {
//       return cache[number]
//     }

//     cache[number] = memoize(number-1) + memoize(number - 2)
//     return cache[number]
//   }

//   return memoize(n)

// };

console.log(fib(n))