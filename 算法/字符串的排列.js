/**
 * @param {string} s
 * @return {string[]}
 */
 var permutation = function(s) {
    const path = [], result = []
    const map = new Map()
    const tracebacking = (s) => {
        if(path.length == s.length) {
            result.push([...path].join(''))
            return
        }

        for(let i = 0; i < s.length; i++) {
            if(map.get(s[i])) continue
            path.push(s[i])
            map.set(s[i], true)
            tracebacking(s)
            path.pop()
            map.set(s[i], false)
        }

    }

    tracebacking(s)
    return result
};

const res = permutation('abc')

console.log(res);