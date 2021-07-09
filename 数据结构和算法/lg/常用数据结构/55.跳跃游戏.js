// 给定一个非负整数数组 nums ，你最初位于数组的 第一个下标 。

// 数组中的每个元素代表你在该位置可以跳跃的最大长度。

// 判断你是否能够到达最后一个下标。

//  

// 示例 1：

// 输入：nums = [2,3,1,1,4]
// 输出：true
// 解释：可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。
// 示例 2：

// 输入：nums = [3,2,1,0,4]
// 输出：false
// 解释：无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0 ， 所以永远不可能到达最后一个下标。

const nums = [2,3,1,1,4]

// 贪心算法 设置一个变量，开始的时候变量是数组的最大值,然后往前遍历，如果每个位置上的数组的index+最大可走的步数 >= maxJump  是一个好点
var canJump = function(nums) {
  let maxJump = nums.length-1
  for(let i = nums.length-2; i>=0; i--) {
    if(i+nums[i] >= maxJump) {
      maxJump = i
    }
  }
  return maxJump === 0
}

// bottom-up 解法
// var canJump = function(nums) {
//   const totalLength = nums.length 
//   const memo = Array(totalLength).fill(0)
//   memo[totalLength-1] = 1

//   // 从后往前递归，如果找到能跳到最后一步的最大步数就把该点标记为1
//   for(let i = nums.length-2; i >= 0; i--) {
//     // 范围，能跳跃的最大步数和数组长度的最小值
//     const maxJump = Math.min(i+nums[i], totalLength-1)
//     // 循环每一位的数组获取跳跃的步数
//     for(let j = i+1; j <= maxJump; j++) {
//       if(memo[j] === 1) {
//         memo[i] = 1
//         break
//       }
//     }
//   }

//   if(memo[0] === 1){
//     return true
//   }else {
//     return false
//   }
// }

//  top-down 解法
// var canJump = function(nums) {
//   const totalLength = nums.length
//   // 初始化标记数组 1-通路  0-未知 -1-不通
//   const memo = Array(totalLength).fill(0)
//   memo[totalLength-1] = 1

//   function jump(position) {
//     if(memo[position] === 1) {
//       return true
//     }else if(memo[position] === -1) {
//       return false
//     }
//     // 确保不越界 当前数字是几就遍历几次，然后计算一次结果
//     const maxJump = Math.min(position + nums[position], totalLength - 1)
//     for(let i = position+1; i <= maxJump; i++) {
//       const jumpResult = jump(i)
//       if(jumpResult === true) {
//         memo[position] = 1
//         return true
//       }
//     }
//     memo[position] = -1
//     return false
//   }

//   return jump(0)
// };

console.log(canJump(nums))