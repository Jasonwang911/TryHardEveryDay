// var reverseWords = function (s) {
//   return s.split(' ').map(item => {
//     return item.split('').reverse().join('')
//   }).join(' ')
// }

var reverseWords = function (s) {
 let res = ''
 for(let i = s.length-1; i >=0; i --) {
   res += s[i]
 }
 return res.split(' ').reverse().join(' ')
}

// console.log('输出结果===>', reverseWords("Let's take LeetCode contest"))

let s =  "Let's take LeetCode contest"
let res = s.split('').reverse().join('').split(' ').reverse().join(' ')


var twoSum = function(nums, target) {
  let res = []
  for(let i = 0; i < nums.length; i ++) {
      for(let j = 1; j < nums.length; j ++) {
        console.log(`${nums[i]}---${nums[j]}, ---${i}---${j}`)
          if(nums[i] + nums[j] === target) {
            res = [i,j]
          }
      }
  }
  return res
};

let sss = twoSum([2,5,5,11],10)
console.log('=====>', sss)