// 有效的字母异位词
// 给定两个字符串s和t，编写一个函数来判断t是否是s的字母异位词

// LeetCode 第 242 题：给定两个字符串 s 和 t，编写一个函数来判断 t 是否是 s 的字母异位词。
// 说明：你可以假设字符串只包含小写字母。

// 示例 1
// 输入: s = "anagram", t = "nagaram"
// 输出: true

// 示例 2
// 输入: s = "rat", t = "car"
// 输出: false

var isAnagram = function(s, t) {
  const source = s.split('');
  const map = {};
  source.forEach(item =>  map[item] ?  map[item] ++ :  map[item] = 1)
  for(let i = 0; i < t.length; i++) {
      if(map[t[i]]) {
        map[t[i]] = map[t[i]] - 1 
          if(map[t[i]] < 0) {
            console.log(map)
              delete map[t[i]]
              console.log(map)
              return false
          }
      }else {
        return false
      }
  }
  console.log(map)
  if(Object.keys(map).length ) {
      return true
  }else {
      return false
  }
};

console.log(isAnagram("anagram", "nagaram"))