// input :  [1,2,3,4,5,6,7,8,9]
// output:  [1, 9, 2, 8, 3, 7, 4, 6, 5]


const arr = [1,2,3,4,5,6,7,8,9]

function meanderingArray(arr) {
  arr.sort((a, b) => a-b)
  let result = []
  let direction = 'right'
  let start = 0
  let end = arr.length-1
  
  while(start <= end) {
    if(direction === 'right') {
      result.push(arr[start])
      start++
      direction = 'left'
    }else {
      result.push(arr[end])
      end--
      direction = 'right'
    }
  }

  return result
}

console.log(meanderingArray(arr))