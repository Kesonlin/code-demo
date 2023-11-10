var lengthOfLIS = function(nums) {
    const len = nums.length
    const dp = new Array(len).map(v => new Array())
    dp[0] = [nums[0]]
    // console.log([...dp[0]].push(1));
    for(let i = 1; i < len; i++) {
        // console.log([...dp[i - 1]]);
        if(nums[i] > dp[i - 1]) {
            dp[i] = [...dp[i - 1]]
            dp[i].push(nums[i])
        } else {
            dp[i] = [...dp[i - 1]]
        }
    }

    return dp[len - 1]
};

console.log(lengthOfLIS([10,9,2,5,3,7,101,18]));