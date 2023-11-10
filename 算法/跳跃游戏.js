var canJump = function(nums) {
    const len = nums.length
    if(len <= 1) return true
    let j = 0, max = 0
    for(let i = 0; i < len; i++) {
        // if(max <= nums[i] + i - j) {
        //     max = nums[i]
        //     j = i
        // }
        //    if(max + i - j >= len - 1) return true
        //    if(!max) return false
        //    console.log(max, j);
        max--
        if(max < nums[i]) {
            max = nums[i]
        }
        if(max + i >= len -1) return true
        if(!max) return false
    }
    return false
};

const res = canJump([3,4,0,1,0,0,3,0])
console.log(res);