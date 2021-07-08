// 给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。

// 示例:

// 输入: ["eat", "tea", "tan", "ate", "nat", "bat"]
// 输出:
// [
//   ["ate","eat","tea"],
//   ["nat","tan"],
//   ["bat"]
// ]

// const strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
const strs = ["tan","eat", "tea",  "ate", "nat", "bat"]
// const strs = ["","b"]

var groupAnagrams = function(strs) {
   const m = {}

   for(let i of strs) {
     const key = [...i].sort().join()
     if(!m[key]) m[key] = []
     m[key].push(i)
   }
   return Object.values(m)
}

// var groupAnagrams = function(strs) {
//   if(!strs.length) return []
//   if(strs.length<2) return [strs]
//   const result = []
//   const strsSort = strs.map(item => {
//     return [...item].sort().join().replace(/\,/g, '')
//   })
//   // strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
//   // arr1 =  ["eat", "tea", "tan", "ate", "nat", "bat"]
//   // arr2 =  [ 'aet', 'aet', 'ant', 'aet', 'ant', 'abt' ]
//   // const result = [
//   //   ['aet', 'aet','aet',],
//   //   [ 'ant', 'ant'],
//   //   [  'abt' ]
//   // ]
//   // [ 'aet', 'ant', 'aet', 'ant', 'abt' ]
//   console.log(strsSort)
//   for(let i = 0; i < strsSort.length-1; i++) {
//       if(strs[0] || strs[0] === '' ) {
//         let item = [strs[0]]
//         strs.splice(0, 1)
//         let j = 0
//         while(strs[j] || strs[j] === '') {
//           console.log(`i: ${i} -- j: ${j} ====>`,strsSort)
//           if( strsSort[i] === strsSort[j]) {
//             console.log(1111)
//             item.push(strs[j])
//             strs.splice(j, 1)
//           }
//           j++
//         }
//         result.push(item)
//       } 
//   }
//   return result
// };

console.log(groupAnagrams(strs))