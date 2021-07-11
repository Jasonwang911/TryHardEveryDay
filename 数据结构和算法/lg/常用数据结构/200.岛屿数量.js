// 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。

// 岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。

// 此外，你可以假设该网格的四条边均被水包围。

//  

// 示例 1：

// 输入：grid = [
//   ["1","1","1","1","0"],
//   ["1","1","0","1","0"],
//   ["1","1","0","0","0"],
//   ["0","0","0","0","0"]
// ]
// 输出：1
// 示例 2：

// 输入：grid = [
//   ["1","1","0","0","0"],
//   ["1","1","0","0","0"],
//   ["0","0","1","0","0"],
//   ["0","0","0","1","1"]
// ]
// 输出：3

const grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]

// bfs - 广度优先搜索
// dfs - 深度优先搜索
var numIslands = function(grid) {
  let count = 0 

  function dfs(row, col) {
    if(row < 0 || row >= grid.length || col < 0 || col >= grid[0].length || grid[row][col] === '0') {
      return 
    }

    grid[row][col] = '0'
    dfs(row-1, col)
    dfs(row+1, col)
    dfs(row, col-1)
    dfs(row, col+1)
  }
  
  for(let row = 0; row < grid.length; row++) {
    for(let col = 0 ; col < grid[0].length; col ++) {
      if(grid[row][col] === '1') {
        count ++
        dfs(row, col)
      }
    }
  }

  return count
};

console.log(numIslands(grid))