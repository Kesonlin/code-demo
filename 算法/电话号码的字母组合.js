/**
 * @param {string} digits
 * @return {string[]}
 */
 var letterCombinations = function(digits) {
    const result = [], path = []
    const len = digits.length
    const map = new Map([
        ['1', ''],
        ['2', 'abc'],
        ['3', 'def'],
        ['4', 'ghi'],
        ['5', 'jkl'],
        ['6', 'mno'],
        ['7', 'pgrs'],
        ['8', 'tuv'],
        ['9', 'wxyz']
    ])
    const traceback = (digits, index) => {
        if(path.length == len) {
            result.push([...path].toString())
            return
        }
        for(let i = 0; i < len; i++) {
            // if(i !== index) {
                if(i == index) continue

                const arr = map.get(digits[i])
                console.log('i', i);
                console.log(arr);
                for(let j = 0; j < arr.length; j++) {
                    path.push(arr[j])
                    traceback(digits, i + 1)
                    path.pop()
                }
            // }
            
        }
    }

    traceback(digits, -1)

    return result
};

letterCombinations('23')
// for(let i = 1; i < 0; i++) {
//     console.log(i);
// }