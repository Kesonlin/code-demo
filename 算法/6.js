/**
 * @param {number[]} prices
 * @return {number}
 */
 var maxProfit = function(prices) {
    const len = prices.length
    // dp[i][1] 表示到了第i天持有股票的最大利润，dp[i][0]
    const dp = new Array(len).fill([]).map(v => new Array(2))




    let flag = false

    dp[0][0] = 0, dp[0][1] = -prices[0]

    for(let i = 1; i < len; i++) {
        // if(flag) {
        //     dp[i][1] = Math.max(dp[i - 1][0], dp[i - 1][1])
        // } else {
        //     dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i])
//        }
        if(i==1){
            if(dp[i - 1][1] +prices[0]>= dp[i - 1][0] ) {
                dp[i][1] = dp[i - 1][1]
            } else if(flag==false){
                dp[i][1] = dp[i - 1][0] - prices[i]
            }else{
                dp[i][1]=dp[i-1][0];
            }  
        }  
        else{
            if(dp[i - 1][1] >= dp[i - 1][0] ) {
                dp[i][1] = dp[i - 1][1]
            } else if(flag==false){
                dp[i][1] = dp[i - 1][0] - prices[i]
            }else{
                dp[i][1]=dp[i-1][0];
            }
        }

        // dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i])
        if(dp[i - 1][1] + prices[i] > dp[i - 1][0]) {
            dp[i][0] = dp[i - 1][1] + prices[i]
            flag = true
        } else {
            dp[i][0] = dp[i - 1][0]
            flag = false
        }
        // dp[i][0] = Math.max(dp[i - 1][1] + prices[i], dp[i - 1][0])
    }

    console.table(dp)

    return dp[len - 1][0]
};

maxProfit([1,2,3,0,2])