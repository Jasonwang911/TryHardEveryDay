// 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。

// 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
// 输出：[1,2,3,6,9,8,7,4,5]

// 输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
// 输出：[1,2,3,4,8,12,11,10,9,5,6,7]

const matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]

var spiralOrder = function(matrix) {
  if(matrix.length === 0) return []

  let top = 0
  let left = 0
  let right = matrix[0].length - 1
  let bottom = matrix.length - 1
  let direction = 'right'
  let result = []

  while(left <= right && top <= bottom) {
    if(direction === 'right') {
      for(let i=left; i <= right; i++) {
        result.push(matrix[top][i])
      }
      top++
      direction = 'bottom'
    }else if(direction === 'bottom') {
      for(let i = top; i <= bottom; i++) {
        result.push(matrix[i][right])
      }
      right --
      direction = 'left'
    }else if(direction === 'left') {
      for(let i = right; i >= left; i--) {
        result.push(matrix[bottom][i])
      }
      bottom --
      direction = 'top'
    }else if(direction == 'top') {
      for(let i = bottom; i >= top; i--) {
        result.push(matrix[i][left])
      }
      left ++
      direction = 'right'
    }
  }

  return result
};

console.log(spiralOrder(matrix))