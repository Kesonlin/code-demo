const sort = (nums1, nums2) => {
    let ans = []
    let idx = 0
    const len1 = nums1.length
    const len2 = nums2.length
    let idx1 = 0, idx2 = 0
    while(idx1 < len1 && idx2 < len2) {
        if(nums1[idx1] <= nums2[idx2]) {
            ans[idx] = nums1[idx1++]
        } else {
            ans[idx] = nums2[idx2++]
        }
        idx++
    }
    if(idx1 == len1 && idx2 == len2) return ans
    if(idx1 != len1) {
        ans = ans.concat(nums1.slice(idx1))
    } else {
        ans = ans.concat(nums2.slice(idx2))
    }
    return ans
}

const mergeSort = (nums) => {
   
    if(nums.length <= 1) return nums
    const len = nums.length
    console.log(len);
    const mid = Math.floor((len - 1) / 2)
    const left = mergeSort(nums.slice(0, mid + 1))
    const right = mergeSort(nums.slice(mid + 1))
    const ans = sort(left, right)
    return ans
}


/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
    
    // quickSort(nums, 0, nums.length - 1)
    const ans = mergeSort(nums)
    return ans
};

const res = sortArray([5,2,3,1])
console.log(res);