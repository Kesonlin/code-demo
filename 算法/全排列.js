const _permute = string => {
    // 补全代码
    const path = [], res = []
    const map = new Map()
    const traceBacking = (string) => {
        if(path.length == string.length) {
            res.push(path.join(''))
            return
        }
        for(let v of string) {
            if(map.get(v)) continue
            path.push(v)
            map.set(v, true)
            traceBacking(string)
            path.pop()
            map.set(v, false)
        }
        

    }
    return res
}

const res = _permute('abc')

console.log(res);