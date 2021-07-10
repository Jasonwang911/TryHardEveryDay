// 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。

// 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。

// 问总共有多少条不同的路径？

// 输入：m = 3, n = 7
// 输出：28
// 示例 2：

// 输入：m = 3, n = 2
// 输出：3
// 解释：
// 从左上角开始，总共有 3 条路径可以到达右下角。
// 1. 向右 -> 向下 -> 向下
// 2. 向下 -> 向下 -> 向右
// 3. 向下 -> 向右 -> 向下
// 示例 3：

// 输入：m = 7, n = 3
// 输出：28
// 示例 4：

// 输入：m = 3, n = 3
// 输出：6

m = 7, n = 3

var uniquePaths = function(m, n) {
  const memo = []
  // 初始化二维数组
  for(let i = 0; i <n; i++) {
    memo.push([])
    memo[i][0] = 1
  }
  for(let i = 0; i < m; i++) {
    memo[0][i] = 1
  }
  for(let row = 1; row < m; row++) {
    for(let col = 1; col < n; col ++) {
      memo[col][row] = memo[col][row-1] + memo[col-1][row]
    }
  }
  console.log(memo)

  return memo[n-1][m-1]
};

console.log(uniquePaths(m, n))