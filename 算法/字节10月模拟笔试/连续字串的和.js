function getSum(nums, b) {
    const sum = []
    const len = nums.length

    sum[0] = nums[0] % b
    for(let i = 1; i < len; i++) {
        sum[i] = (sum[i - 1] + nums[i]) % b
    }

    let res = 0
    const map = new Map()

    for(const s of sum) {
        if(s == 0) res++

        res += map.has(s) ? map.get(s) : 0

        map.set(s, (map.get(s) || 0) + 1)
    }

    console.log(res);
    return res
}

const arr = [1, 2, 3], b = 3

getSum(arr, b)

