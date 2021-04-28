var reverseWords = function (s) {
  let wordArr = s.split(' ')
  console.log(wordArr)
  for (let i = 0; i <= wordArr.length - 1; i++) {
    wordArr[i] = wordArr[i].split('').reverse().join('')
    console.log(wordArr[i])
  }
  return wordArr.join(' ')
}

console.log('输出结果===>', reverseWords("Let's take LeetCode contest"))
