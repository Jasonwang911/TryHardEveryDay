// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。

// 注意：答案中不可以包含重复的三元组。

//  

// 示例 1：

// 输入：nums = [-1,0,1,2,-1,-4]
// 输出：[[-1,-1,2],[-1,0,1]]
// 示例 2：

// 输入：nums = []
// 输出：[]
// 示例 3：

// 输入：nums = [0]
// 输出：[]

const nums = [-2,0,3,-1,4,0,3,4,1,1,1,-3,-5,4,0]

var threeSum = function(nums) {
  let result = []
  // 1. 给数组排序
  nums.sort((a, b) => a-b)
  // 2. 遍历数组，从0遍历到length-2
  for(let i = 0; i < nums.length - 2; i++) {
     // 3. 如果当前的数字等于前一个数字，则跳过当前这个数(为了去重)
    if(i === 0 || nums[i] !== nums[i-1]) {
      // 4. 如果数字不同，则设置start = i +1; end = length -1 查看 i start end 三个数的和比0大还是小，如果比0小 start ++; 如果比0大 end--; 如果等于0； 把这三个数加入到结果里
      let start = i + 1
      let end = nums.length - 1
      while(start < end) {
        if(nums[i] + nums[start] + nums[end] === 0) {
          result.push([nums[i], nums[start], nums[end]] )
          start ++
          end --
          // 去重
          while(start<end && nums[start] === nums[start-1]) {
            start++
          }
          while(start < end && nums[end] === nums[end +1]) {
            end--
          }
        }else if(nums[i] + nums[start] + nums[end] > 0) {
          end--
        }else {
          start++
        }
      }
    }
  }
 
  // 返回结果
  return result
};

console.log(threeSum(nums))