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

// 思路  将一个字符串变为对象  key是出现的字母，value是该字母出现的次数，然后循环第二个字符串，对改对象对应的出现次数进行相减，出现次数为0后删除该key
var isAnagram = function(s, t) {
  if(s.length !== t.length) return false
  const source = s.split('');
  const map = {};
  source.forEach(item =>  map.hasOwnProperty(item) ?  map[item] ++ :  map[item] = 0)
  for(let i = 0; i < t.length ; i++) {
      if(map.hasOwnProperty(t[i])) {
        map[t[i]] = map[t[i]] - 1 
          if(map[t[i]] < 0) {
              delete map[t[i]]
          }
      }else {
        return false
      }
  }
  if(Object.keys(map).length) {
      return false
  }else {
      return true
  }
};

// console.log(isAnagram("anagram", "nagaram"))

// 思路2： 将两个字符串排序后比较是否相同。
var isAnagram = function(s, t) {
  if(s.length !== t.length) return false
  return [...s].sort().join('') === [...t].sort().join('')
}




console.log(isAnagram("anagram", "nagaram"))