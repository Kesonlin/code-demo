var findSubsequences = function(nums) {
    const result = [], path = []
    nums.sort((a, b) => a - b)
    const traceback = (nums, index) => {
        console.log(nums.length);
        if(path.length > 1) {
            result.push([...path])
            console.log(result);
        }
        if(index > nums.length) {
            console.log(222);
            return
        }
        for(let i = index; i < nums.length; i++) {
            console.log(11);
            path.push(nums[i])
            traceback(nums, i + 1)
            path.pop()
        }
    }
    traceback(nums, 0)
    return result
};

const res = findSubsequences([4, 6, 7, 7])

// console.log(res);