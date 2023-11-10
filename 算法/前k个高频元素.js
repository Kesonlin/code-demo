/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
 var topKFrequent = function(nums, k) {

    const swap = (array, i, j) => {
        console.log(array[i], array[j]);
        const a = array[i][0], b = array[i][1]
        array[i][0] = array[j][0], array[i][1] = array[j][1]
        array[j][0] = a, array[j][1] = b
        // [array[i][0], array[j][0]] = [array[j][0], array[i][0]]
        // [array[i][1], array[j][1]] = [array[j][1], array[i][1]]
    }

    const maxHeapify = (nums, index, len) => {
        let left = index * 2 + 1, right = index * 2 + 2
        let max = index
        if(left < len && nums[max][1] < nums[left][1]) {
            max = left
        }
        if(right < len && nums[max][1] < nums[right][1]) {
            max = right
        }
        if(max != index) {
            swap(nums, max, index)
            maxHeapify(nums, max, len)
        }
    }

    const buildMaxHeap = (nums, len) => {
        const first = (len / 2) | 0
        for(let i = first; i >= 0; i--) {
            maxHeapify(nums, i, len)
        }
    }


    const map = new Map()
    for(let v of nums) {
        if(map.has(v)) {
            map.set(v, map.get(v) + 1)
        } else {
            map.set(v, 1)
        }
    }

    const maps = [...map.entries()]
    // console.log(maps);
    let len = maps.length
    // console.log(len);
    buildMaxHeap(maps, maps.length)
    
    const ans = []
    for(let i = len - 1; i >= maps.length - k; i--) {
        // console.log(1);
        console.log(maps);
        ans.push(maps[0][0])
        swap(maps, 0, i)
        console.log(maps);

        len--
        maxHeapify(maps, 0, len)
    }

    return ans
};

const res = topKFrequent([1,1,1,2,2,3], 2)

console.log(res);