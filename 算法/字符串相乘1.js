function multiple(s1, s2) {
    if(s1.length > s2.length) {
        const t = s1
        s1 = s2
        s2 = t
    }
    const len1 = s1.length, len2 = s2.length
    let bit = 0
    let ans = []
    for(let i = len1- 1; i >= 0; i--) {
        const s = s1[i]
        
        console.log(s);
        const res = []
        let ret = 0
        for(let j = len2 - 1; j >= 0; j--) {
            const val = parseInt(s1[i]) * parseInt(s2[j]) + ret
            console.log(val);
            ret = Math.floor(val / 10)
            res.unshift(val % 10)
        }
        if(ret != 0) {
            res.unshift(ret)
        }
        for(let k = 0; k < bit; k++) {
            res.push(0)
        }
        ans = add(ans, res)
        bit++
    }
    
    console.log(ans);
    return ans.join('')
}

function add(num1, num2) {
    const anss = []
    const len1 = num1.length
    const len2 = num2.length
    let i = len1 - 1, j = len2 - 1
    let ret = 0
    while(i >= 0 || j >= 0) {
        const v1 = i < 0 ? 0 : num1[i]
        const v2 = j < 0 ? 0 : num2[j]
        const val = v1 + v2 + ret
        anss.unshift(val % 10)
        ret = Math.floor(val / 10)
        i--, j--
    }
    if(ret != 0) {
        anss.unshift(ret)
    }
    console.log('anss', anss);

    return anss
}

const res = multiple('123', '456')

console.log(res);