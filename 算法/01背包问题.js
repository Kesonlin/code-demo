/**
 * @二维写法
 * @param {*每件物品的重量} weight 
 * @param {*每件物品的价值} value 
 * @param {*背包最大能承受的重量} size
 * 
 * dp[i][j]表示从下标为0-i的物品任取，放进容量为j的背包，价值总和是多少 
 */
function testWeightBagProblem(weight, value, size) {
    const len = weight.length
    const dp = new Array(len).fill([]).map(v => new Array(size + 1).fill(0))

    for(let i = weight[0]; i <= size; i++) {
        dp[0][i] = value[0]
    }

    console.table(dp)
    for(let i = 1; i < len; i++) {
        for(let j = 0; j <= size; j++) {
            if(weight[i] > j) {
                dp[i][j] = dp[i - 1][j]
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight[i]] + value[i])
            }
        }
    }

    return dp[len - 1][size]
}

const res = testWeightBagProblem([1, 2, 4], [15, 20, 70], 4)

console.log(res);


/**
 * dp[i]表示的是容量为i的背包所背的最大价值
 * @param {*} weight 
 * @param {*} value 
 * @param {*} size 
 */
function fn(weight, value, size) {
    const len = weight.length
    const dp = new Array(size + 1).fill(0)
    for(let i = 0; i < len; i++) {
        for(let j = size; j >= weight[i]; j--) {
            dp[i] = Math.max(dp[i], dp[j - weight[i]] + value[i])
        }
    }
}