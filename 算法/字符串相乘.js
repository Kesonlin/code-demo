/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
 var addStrings = function(num1, num2) {
    let index = 0, sum = 0, len = Math.max(num1.length, num2.length) - 1
    const res = []
    let index1 = num1.length - 1, index2 = num2.length - 1

    while(index1 >= 0 || index2 >= 0 || sum != 0) {
        const i = Number(num1[index1]) ? +num1[index1] : 0
        const j = Number(num2[index2]) ? +num2[index2] : 0
        res.unshift((i + j + sum) % 10)
        sum = Math.floor((i + j + sum) / 10)
        index1--, index2--
    }

    return res.join('')

};

var multiply = function(num1, num2) {
    if(num1 == '0' || num2 == '0') return '0'
    let index1 = num1.length - 1
    let index2 = num2.length - 1
    let i = 1, ans = ''
    while(index1 >= 0) {
        let res = '', rest = 0
        for(let i = index2; i >= 0; i--) {
            const val = num1[index1] * num2[i]
            let val1 = ((val + rest) % 10).toString()
            const j = Math.pow(10, index2 - i).toString()
            for(let k = 0; k < j.length - 1; k++) {
                val1 += '0'
            }
            // res += (val % 10 + rest) * Math.pow(10, index2 - i)
            rest = val >= 10 ? Math.floor(val / 10) : 0
            res = addStrings(res, val1)
        }
        if(rest != 0) {
            const v = Math.pow(10, index2 + 1) * rest
            res = addStrings(res, v.toString())
            // res += Math.pow(10, index2 + 1) * rest
        }

        // console.log(i.toString());
        // res = addStrings(res.toString(), i.toString())
        // console.log(res, res.toString());
        console.log('res * i', res * i);
        for(let j = 0; j < i.toString().length - 1; j++) {
            res += '0'
        }
        console.log('res', res);
        // res = (res * i).toString()
        // console.log(res);

        ans = addStrings(res, ans)
        // }
        i *= 10
        index1--
    }

    return ans.toString()
};

// const res = multiply("498828660196", "840477629533")
// const res = multiply("1234", "567")
// const res = multiply("401716832807512840963", "167141802233061013023557397451289113296441069")

// console.log(res);

const multiply1 = (num1, num2) => {
    const len1 = num1.length
    const len2 = num2.length
    const pos = new Array(len1 + len2).fill(0)

    for(let i = len1 - 1; i >= 0; i--) {
        const val1 = +num1[i]
        for(let j = len2 - 1; j >= 0; j--) {
            const val2 = +num2[j]
            const sum = pos[i + j + 1] + val1 * val2
            pos[i + j + 1] = sum % 10
            pos[i + j] += sum / 10 | 0
        }
    }
    while(pos[0] == 0) {
        pos.shift()
    }
    console.log('111', pos.join(''));
    return pos.join('')
}

multiply1('0', '0')