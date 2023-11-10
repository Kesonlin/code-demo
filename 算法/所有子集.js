function allLists(nums) {
    const path = [], result = []
    const tracebacking = (nums, index) => {
        if(path.length > nums.length) return
        result.push([...path])
        for(let i = index; i < nums.length; i++) {
            path.push(nums[i])
            tracebacking(nums, i + 1)
            path.pop()
        }
    }
    tracebacking(nums, 0)
    console.log(result);
}

allLists([1, 2, 3])