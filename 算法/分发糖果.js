/**
 * @param {number[]} ratings
 * @return {number}
 */
 var candy = function(ratings) {
    const len = ratings.length
    let ans = 0
    const sum = new Array(len).fill(1)

    for(let i = 1; i < len; i++) {
        if(ratings[i] > ratings[i - 1]) {
            sum[i] = sum[i - 1] + 1
        }
    }
    for(let i = len - 2; i >= 0; i--) {
        if(ratings[i] > ratings[i + 1]) {
            // sum[i] += 1
             sum[i] = Math.max(sum[i], sum[i + 1] + 1)
        }
    }
    console.log(sum);
    for(let v of sum) {
        ans += v
    }

    return ans
};

candy([1,0,2])