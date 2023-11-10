var maxProfit = function(prices) {
    const len = prices.length
   const dp = new Array(len + 1) 
   dp[0] = 0, dp[1] = -7
   for(let i = 2; i <= len; i++) {
    //    console.log(...[...prices].slice(0, i - 1));
       dp[i] = Math.max(dp[i - 1], prices[i - 1] - Math.min(...[...prices].slice(0, i - 1)))
    //    console.log(dp[i]);
   }

   return dp[len] > 0 ? dp[len] : 0
};

maxProfit([7,1,5,3,6,4])