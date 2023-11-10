/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
 var compareVersion = function(version1, version2) {
    const v11 = version1.split('.')
    const v22 = version2.split('.')
    // console.log(v1, v2);
    const len = Math.max(v11.length, v22.length)
    for(let i = 0; i < len; i++) {
        const v1 = v11[i] ? Number(v11[i]) : 0
        const v2 = v22[i] ? Number(v22[i]) : 0
        console.log(v1, v2);
        if(v1 > v2) return 1
        if(v1 < v2) return -1
    }
    return 0
};

const res = compareVersion("1.0.1", '1')

console.log(res);