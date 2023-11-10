/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findLength = function (nums1, nums2) {
    const len1 = nums1.length, len2 = nums2.length
    const dp = new Array(nums1.length + 1).fill([]).map(v => new Array(nums2.length + 1).fill(0))

    dp[0][1] = 0, dp[1][0] = 0
    let ans = 0
    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            if (nums1[i - 1] == nums2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1
                ans = Math.max(ans, dp[i][j])
            } else {
                dp[i][j] = dp[i - 1][j - 1]
                // dp[i][j] = 0
            }
            console.log( `dp[${i}][${j}]`, dp[i][j]);
        }
    }

    return dp[len1][len2]
    // return ans
};

findLength([1, 2, 3, 2, 1]
    , [3, 2, 1, 4, 7])