// 给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。

// 最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。

// 你可以假设除了整数 0 之外，这个整数不会以零开头。

//  

// 示例 1：

// 输入：digits = [1,2,3]
// 输出：[1,2,4]
// 解释：输入数组表示数字 123。
// 示例 2：

// 输入：digits = [4,3,2,1]
// 输出：[4,3,2,2]
// 解释：输入数组表示数字 4321。
// 示例 3：

// 输入：digits = [0]
// 输出：[1]

const digits = [6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,3]

var plusOne = function(digits) {
  for(let i = digits.length-1; i>=0; i--) {
    if(digits[i] !== 9) {
      digits[i] ++
      return digits
    }else {
      digits[i] = 0
    }
  }
  return [1, ...digits]
};

console.log(plusOne(digits))