function quickSort(array, from, end) {
    if(from >= end) {
        return
    }
    const pivot = array[from]
    let left = from, right = end
    while(left < right) {
        while(array[right] >= pivot && right > left) {
            right--
        }
        while(array[left] <= pivot && right > left) {
            left++
        }
        if(right > left) {
            [array[left], array[right]] = [array[right], array[left]]
        }
    }
    array[from] = array[left]
    array[left] = pivot
    quickSort(array, from, left - 1)
    quickSort(array, left + 1, end)
}


const nums = [1, 2, 3, 1, 1, 1, 1, 9]
quickSort(nums, 0, nums.length - 1)
console.log(nums);

const _quickSort = array => {
    // 补全代码
    const quickSort = (array, begin, end) => {
       if(begin >= end) return        
       let left = begin, right = end
       const pivot = array[left] 
       while(left < right) {
           while(right > left && array[right] >= pivot) {
               right--
           }
           while(right > left && array[left] <= pivot) {
               left++
           }
           if(left < right) {
               [array[left], array[right]] = [array[right], array[left]]
           }
           
       }
        array[begin] = array[left]
        array[left] = pivot
        quickSort(array, begin, left - 1)
        quickSort(array, left + 1, end)
    }
    quickSort(array, 0, array.length - 1)
    return array
    
}

const arr = [2, 4, 1, 6, 8, 99]
_quickSort(arr)
console.log(arr);