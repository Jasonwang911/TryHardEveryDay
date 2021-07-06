const arr = [7,28,-28,0,9,33]

function sortArr(n) {
  arr.sort((a, b) => {
    return Math.abs(a - n) - Math.abs(b - n)
  })
  console.log(arr)
}

sortArr(28)