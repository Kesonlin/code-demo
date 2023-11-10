/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */

 const findSum = (needle) => {
    const sum = [-1, 0], len = needle.length
    for(let i = 2; i < needle.length; i++) {     
        let index = sum[i - 1]
        // if(i == 6) {
        //     console.log(index);
        //     // console.log(sum[i]);
        // }
        while(index > 0) {
            if(i == 6) {
                console.log(index);
                // console.log(sum[i]);
            }
            if(needle[i - 1] == needle[index]) {
                sum[i] = index + 1
                // if(i == 6) {
                //     console.log(index);
                //     console.log(sum[i]);
                // }
                break
            } else {
                index = sum[index]
            }
        }
        if(index <= 0 && !sum[i]) {
            sum[i] = needle[i - 1] == needle[0] ? 1 : 0
        }  
    }
    // let cn = 0, i = 2
    // while(i < needle.length) {
    //     if(needle[i - 1] == needle[cn]) {
    //         sum[i++] = ++cn
    //     } else if(cn > 0) {
    //         cn = sum[cn]
    //     } else {
    //         sum[i++] = 0
    //     }
    // }
    console.log(sum);
    return sum
}

var strStr = function(haystack, needle) {
    const sum = findSum(needle)
    let i1 = 0, i2 = 0
    while(i1 < haystack.length && i2 < needle.length) {
        if(haystack[i1] == needle[i2]) {
            i1++, i2++
        } else if(i2 == 0) {
            i1++          
        } else {
            i2 = sum[i2]
        }
    }

    return i2 == needle.length ? i1 - i2 : -1

};

const res = strStr("aabaaabaaac", "aabaaac")
console.log(res);