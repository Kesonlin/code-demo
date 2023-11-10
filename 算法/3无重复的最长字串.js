/**
 * @param {string} s
 * @return {number}
 */
 var lengthOfLongestSubstring = function(s) {
    const map = new Map()
    const len = s.length
    let rk = 0, ans = 0
    for(let i = 0; i < len; i++) {
        if(i != 0) {
            map.delete(s[i - 1])
        }
        
        while(rk < len && !map.has(s[rk])) {
            // console.log(rk);
            map.set(s[rk], 1)
            rk++
            
            // console.log(map);
        }
        console.log(map, rk - i);
        ans = Math.max(ans, rk - i)
    }

    return ans
};

const res = lengthOfLongestSubstring("pwwkew")
console.log(res);