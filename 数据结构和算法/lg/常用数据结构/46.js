// 给定一个没有重复数字的序列，返回其所有可能的全排列。

// 输入: [1,2,3]
// 输出:
// [
//   [1,2,3],
//   [1,3,2],
//   [2,1,3],
//   [2,3,1],
//   [3,1,2],
//   [3,2,1]
// ]

const permute = (nums) => {
  const res = []
  const arr = []

  const dfs = (path) => {
    if(path.length === nums.length) {
      res.push([...path])
       return
    }
    for(let num of nums) {
      console.log(num)
      if(arr[num]) continue
      path.push(num)
      console.log(path)
      arr[num] = true
      dfs(path)
      path.pop()
      arr[num] = false
    }
  }

  dfs([])
  return res
}

permute([1,2,3])