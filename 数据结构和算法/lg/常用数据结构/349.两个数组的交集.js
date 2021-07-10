// 给定两个数组，编写一个函数来计算它们的交集。

//  

// 示例 1：

// 输入：nums1 = [1,2,2,1], nums2 = [2,2]
// 输出：[2]
// 示例 2：

// 输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
// 输出：[9,4]

const nums1 = [1,2,2,1], nums2 = [2,2]

var intersection = function(nums1, nums2) {
  let result = new Set()
  let set = new Set(nums2)

  for(let num of nums1) {
    if(set.has(num)) {
      result.add(num)
    }
  }

  return Array.from(result)
};

// var intersection = function(nums1, nums2) {
//   let result = []
//   for(let i = 0; i < nums1.length; i++) {
//     for(let j = 0; j < nums2.length; j++) {
//       if(nums1[i] === nums2[j] && result.indexOf(nums1[i]) === -1) {
//         result.push(nums1[i])
//       }
//     }
//   }
//   return result
// };

console.log(intersection(nums1, nums2))