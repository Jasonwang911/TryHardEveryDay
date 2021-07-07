
// 给你一个字符串 s，找到 s 中最长的回文子串。

 

// 示例 1：

// 输入：s = "babad"
// 输出："bab"
// 解释："aba" 同样是符合题意的答案。
// 示例 2：

// 输入：s = "cbbd"
// 输出："bb"
// 示例 3：

// 输入：s = "a"
// 输出："a"
// 示例 4：

// 输入：s = "ac"
// 输出："a"
const s = "babad"

var longestPalindrome = function(s) {
  if(s.length<2) {
    return s
  }
  let start = 0 
  let maxLength = 1
  function expandAroundCenter(left, right) {
    while(left>=0 && right<s.length && s[left] === s[right]) {
      if(right - left + 1 > maxLength) {
        maxLength = right -left+1
        start = left
      }
      left --
      right ++
    }
  }
  for(let i = 0; i < s.length; i++) {
    expandAroundCenter(i-1, i+1)
    expandAroundCenter(i, i+1)
  }
  return s.substring(start, start+maxLength)
};

console.log(longestPalindrome(s))