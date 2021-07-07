// 给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。

// 示例:

// 输入: ["eat", "tea", "tan", "ate", "nat", "bat"]
// 输出:
// [
//   ["ate","eat","tea"],
//   ["nat","tan"],
//   ["bat"]
// ]

const strs = ["eat", "tea", "tan", "ate", "nat", "bat"]

var groupAnagrams = function(strs) {
  if(!strs.length) return []
  if(strs.length<2) return [strs]
  const result = []
  const strsSort = strs.map(item => {
    return [...item].sort().join().replace(/\,/g, '')
  })
  // [ 'aet', 'aet', 'ant', 'aet', 'ant', 'abt' ]
  // [ 'aet', 'ant', 'aet', 'ant', 'abt' ]
  const length = strsSort.length
  for(let i = 0; i < strsSort.length; i++) {
     const item = [strsSort.shift()]
     while(strsSort.indexOf(item[0]) !== -1) {
      const index = strsSort.indexOf(item[0])
      item.push(strsSort[index])
      strsSort.splice(index, 1)
     }
     result.push(item)
  }
  return result
};

console.log(groupAnagrams(strs))