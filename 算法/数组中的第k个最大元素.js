/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

 const maxHeapify = (array, i, len) => {
    const left = i * 2 + 1, right = i * 2 + 2
    let max = i
    if(left < len && array[max] < array[left]) {
        max = left
    }
    if(right < len && array[max] < array[right]) {
        max = right
    }

    if(max != i) {
        swap(array, i, max)
        maxHeapify(array, max, len)
    }
}

const swap = (array, i, j) => {
    [array[i], array[j]] = [array[j], array[i]]
}

const buildMaxHeap = (array, len) => {
    // const first = (len / 2) | 0
    const first = Math.floor(len / 2)   // 两种写法都可以
    for(let i = first; i >= 0; i--) {
        maxHeapify(array, i, len)
    }
}


var findKthLargest = function(nums, k) {
    let len = nums.length
    buildMaxHeap(nums, len)
    // return nums[k-1]  因为只知道第一个元素是最大的
    for(let i = len-1; i >= nums.length-k+1; i--) {
        swap(nums, 0, i)
        len--  // 因为这里len会变化，所以for循环不能以len为临界条件
        maxHeapify(nums, 0, len)
    }
    return nums[0]
};