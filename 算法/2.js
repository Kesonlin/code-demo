var permute = function (nums) {
    let result = [], path = new Set()
    const traceback = (len, nums) => {
        if (path.size == len) {
            result.push([...path])
            return
        }
        for (let i = 0; i < len; i++) {
            console.log(path);
            console.log(nums);
            console.log(nums[i]);
            // console.log(path.has(nums[i]));
            if (!path.has(nums[i])) {
                path.add(nums[i])
                traceback(len, nums)
                path.delete(nums[i])
            }

        }
    }
    const len = nums.length
    traceback(len, nums)
    return result
};

console.log(permute([1, 2, 3]));