// 给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。

// 说明：本题中，我们将空字符串定义为有效的回文串。

// 示例 1:

// 输入: "A man, a plan, a canal: Panama"
// 输出: true
// 示例 2:

// 输入: "race a car"
// 输出: false


// const s = "A man, a plan, a canal: Panama"
const s = "0P"  

var isPalindrome = function(s) {
  if(!s.length) return true
  s = s.toLowerCase().replace(/[^a-z]/gi, '')
  // s = s.toLowerCase().replace(/[\W_]/g, '')
  console.log(s)
  if(s.length < 2) return false
  let left = 0; right = s.length-1;
  while(left < right) {
    if(s[left] !== s[right]) {
      return false
    }
    left ++
    right --
  }
  return true
};

console.log(isPalindrome(s))