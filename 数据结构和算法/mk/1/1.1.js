// 557. 反转字符串中的单词 III
// 给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。

// 输入："Let's take LeetCode contest"
// 输出："s'teL ekat edoCteeL tsetnoc"

// 在字符串中，每个单词由单个空格分隔，并且字符串中不会有任何额外的空格



var reverseWords = function(s) {
  return  s.split(' ').map(word => word.split('').reverse().join('')).join(' ')
};

console.log(reverseWords("Let's take LeetCode contest"))



// 1. split() 可以接收一个正则进行切分，  /\s/ 是空格  s.split(/\s/).map(word => word.split('').reverse().join('')).join(' ')
// 2. match() match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配  /[\w']+/g   [] 可选项  + 一个或者多个  
//  s.match(/[\w']+/g ).map(word => word.split('').reverse().join('')).join(' ')