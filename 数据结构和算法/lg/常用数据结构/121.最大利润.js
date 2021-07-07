const prices = [7,1,5,3,6,4]

const maxProfit = function(prices) {
  if(prices.length === 0) return 0
  let minPrice = prices[0]; maxPrice = 0;
  for(let i = 0; i < prices.length; i++) {
    if(prices[i] < minPrice) {
      minPrice = prices[i]
    }else if(prices[i] - minPrice > maxPrice) {
      maxPrice = prices[i] - minPrice
    }
  }
  return maxPrice
}

console.log(maxProfit(prices))