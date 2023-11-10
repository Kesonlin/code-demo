function fn(nums, k) {

    const len = nums.length
    let count = 0

    const sum = [0]

    for(let i = 0; i < len; i++) {
        if(nums[i] == k) {
            nums[i] = 0
            count++
        } else {
            nums[i] = 1
        }
        // if(i > 0) {
        //     sum[i + 1] = sum[i] + nums[i]
        // } else {
        //     sum[0] = nums[0]
        // }
        sum[i + 1] = sum[i] + nums[i]
    }

    console.log(sum);

   
    

    // for(let i = 1; i < len; i++) {
    //     sum[i] = sum[i - 1] + nums[i]
    // }

    let left = 1, right = count
    let res = count + 1
    // left++
    // right++

    while(right < len) {
        const val = sum[right] - sum[left - 1]
        res = Math.min(res, val)
        left++, right++
    }

    console.log(res);
    return res
}

fn([1, 2, 1, 2, 1, 3, 2, 2, 2, 4, 5, 6, 2], 2)