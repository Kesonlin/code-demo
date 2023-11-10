class UnionFind {
    constructor(nums) {
        this.parent = new Map()
        this.nums = nums
        this.UnionFind(nums)
    }

    UnionFind(nums) {
        for(let num of nums) {
            this.parent.set(num, num)
        }
    }

    find(x) {
        if(!this.parent.has(x)) return null

        while(x != this.parent.get(x)) {
            // 路径压缩
            this.parent.set(x, this.parent.get(this.parent.get(x)))
            x = this.parent.get(x)
        }

        return x
    }

    union(x, y) {
        const rootX = this.find(x)
        const rootY = this.find(y)

        if(rootX == rootY) return 

        this.parent.set(rootX, rootY)
    }
}

function longestConsecutive(nums) {
    const uf = new UnionFind(nums)
    let ans = 0

    for(let num of nums) {
        if(uf.find(num + 1) != null) {
            uf.union(num, num + 1)
        }
    }

    for(let num of nums) {
        const right = uf.find(num)
        ans = Math.max(ans, right - num + 1)
    }

    return ans
}