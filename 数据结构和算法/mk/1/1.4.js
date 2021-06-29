// leetcode16 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

// 输入: "abcabcbb"
// 输出: 3 
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

// 思路
// 一、从0开始判断新字符串是否存在当前值（有一点类似去重的前半部分）
// 二、随时更新字符串长度，用于得到max值
// 三、如果发现了重复项我们虽然会继续添加，但是我们从相同值首次出现的位置截取之后一位截取。


var lengthOfLongestSubstring = function(s) {
  let len = 0;
  let val = '';
  for (let i = 0; i < s.length; i++) {
      if (val.indexOf(s[i]) === -1) {
          val = val + s[i];
          if (val.length > len) {
              len = val.length;
          }
      } else {
          val = val + s[i];
          let index = val.indexOf(s[i]);
          val = val.slice(index + 1);
      }
  }
  return len;
}