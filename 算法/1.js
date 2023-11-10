var singleNumber = function(nums) {
    const len = nums.length
    for(let i = 0; i < len; i++) {
        if(!nums.find((element, index) => {
            console.log(index);
            return element == nums[i] && index !== i
        })) {
            return nums[i]
        }
    }
};

const array = [600,698,-813,-262,233,804,-258,97,798,-77, 600]

const res = singleNumber(array)

console.log(res);