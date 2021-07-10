
// 给定一个整数数组和一个整数 k，判断数组中是否存在两个不同的索引 i 和 j，使得 nums [i] = nums [j]，并且 i 和 j 的差的 绝对值 至多为 k。

 

// 示例 1:

// 输入: nums = [1,2,3,1], k = 3
// 输出: true
// 示例 2:

// 输入: nums = [1,0,1,1], k = 1
// 输出: true
// 示例 3:

// 输入: nums = [1,2,3,1,2,3], k = 2
// 输出: false

const nums = [1,2,3,1], k = 3

var containsNearbyDuplicate = function(nums, k) {
  const map = new Map()

  for(let i = 0; i < nums.length; i++) {
    if(map.has(nums[i]) && (i-map.get(nums[i])) <= k) {
      return true
    }else {
      map.set(nums[i], i)
    }
  }

  return false
};

console.log(containsNearbyDuplicate(nums, k))