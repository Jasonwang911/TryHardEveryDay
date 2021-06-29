// leetcode 15 给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。

// 你可以假设 nums1 和 nums2 不会同时为空。

// nums1 = [1, 3] ，nums2 = [2]	2.0
// nums1 = [1, 2] ，nums2 = [3, 4]	2.5

var findMedianSortedArrays = function(nums1, nums2) {
  var arr = []
  arr = nums1.concat(nums2) // 合并
  var mid = Math.floor(arr.length / 2) //
  arr.sort((a, b)=>{
      return a - b
  })
  // 根据数组的长度，判断中位数是否需要平均分
  if(arr.length % 2 == 0){
      return ((arr[mid]+arr[mid-1])/2).toFixed(1)
  }else{
      return arr[mid].toFixed(1)
  }
}