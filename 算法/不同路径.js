/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
    // dp表示走到哪一格的路径总数
    const dp = new Array(m).fill([]).map(v => new Array(n))
    dp[0][0] = 1, dp[0][1] = 1, dp[1][0] = 1
    for (let i = 0; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (i - 1 < 0) {
                dp[i][j] = dp[i][j - 1]
            } else {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
            }
            console.log(dp[i][j]);
        }

        

    }

    return dp[m - 1][n - 1]

};

uniquePaths(3, 7)