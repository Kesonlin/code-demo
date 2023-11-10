/**
 * @param {string[]} strs
 * @return {string}
 */

 const isCommon = (strs, len) => {
    const str = strs[0].substring(0, len + 1)
    for(let i = 1; i < strs.length; i++) {
        // const str = strs[i]
        for(let j = 0; j <= len; j++) {
            if(str[j] != strs[i][j]) {
                return false
            }
        }
    }

    return true
}

var longestCommonPrefix = function(strs) {
    let minLen = Infinity
    for(let str of strs) {
        minLen = Math.min(minLen, str.length)
    }
    console.log('minLen', minLen);
    let left = 0, right = minLen - 1
    while(left <= right) {
        const mid = Math.floor((left + right) / 2)
        if(isCommon(strs, mid)) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    console.log(left);
    return strs[0].substring(0, left)

};

const res = longestCommonPrefix(["flower","flow","flight"])

console.log(res);