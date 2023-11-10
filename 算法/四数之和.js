/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
    const len = nums.length
    if (len < 4) return []
    const ans = []
    nums.sort((a, b) => a - b)
    for (let i = 0; i < len - 3; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue
        for (let j = i + 1; j < len - 2; j++) {
            if (j > i + 1 && nums[j] == nums[j - 1]) continue
            let left = j + 1, right = len - 1
            while (left < right) {

                const sum = nums[i] + nums[j] + nums[left] + nums[right]
                if (sum > target) {

                    right--
                    continue
                }
                if (sum < target) {
                    console.log(1);
                    left++
                    continue
                }
                ans.push([nums[i], nums[j], nums[left], nums[right]])
                while (left < right && nums[left] == nums[left + 1]) {
                    console.log(1);
                    left++
                }
                while (left < right && nums[right] == nums[right - 1]) {
                    console.log(1);
                    right--
                }

            }

        }
    }

    return ans
};

const res = fourSum([1, 0, -1, 0, -2, 2], 0)

console.log(res);