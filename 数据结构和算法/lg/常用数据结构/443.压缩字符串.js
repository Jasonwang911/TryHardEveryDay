// 给定一组字符，使用原地算法将其压缩。

// 压缩后的长度必须始终小于或等于原数组长度。

// 数组的每个元素应该是长度为1 的字符（不是 int 整数类型）。

// 在完成原地修改输入数组后，返回数组的新长度。


// 进阶：
// 你能否仅使用O(1) 空间解决问题？

// 实例1
// 输入：
// ["a","a","b","b","c","c","c"]

// 输出：
// 返回 6 ，输入数组的前 6 个字符应该是：["a","2","b","2","c","3"]

// 说明：
// "aa" 被 "a2" 替代。"bb" 被 "b2" 替代。"ccc" 被 "c3" 替代。

// 输入：
// ["a"]

// 输出：
// 返回 1 ，输入数组的前 1 个字符应该是：["a"]

// 解释：
// 没有任何字符串被替代。

// 输入：
// ["a","b","b","b","b","b","b","b","b","b","b","b","b"]

// 输出：
// 返回 4 ，输入数组的前4个字符应该是：["a","b","1","2"]。

// 解释：
// 由于字符 "a" 不重复，所以不会被压缩。"bbbbbbbbbbbb" 被 “b12” 替代。
// 注意每个数字在数组中都有它自己的位置。

const chars = ["a","a","b","b","c","c","c"]

var compress = function(chars) {
  let result = []
  let sum = 1
  for(let i = 0; i < chars.length - 1; i++) {
    if(chars[i] === chars[i+1]) {
      sum ++
    }else {
      result.push(chars[i])
      result.push(sum.toString())
      sum = 1
    }
  }
  result.push(chars[chars.length-1])
  result.push(sum.toString())
  return result.length < chars.length ? result : chars
};

console.log(compress(chars))