/**
 * @param {string} digits
 * @return {string[]}
 */
 var letterCombinations = function(digits) {
    const mapp = ["","","abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"];
    const len = digits
    const str = Array.from(digits).map((v) => mapp[v])
    const path = [], result = []
    const flag = []
    console.log(str);
    const traceback = (str, index) => {
        if(path.length == len) {
            result.push(path.join(''))
            return
        }
        
        // for(let i = index; i < str.length; i++) {
            // if(flag[i] == true) continue
            // flag[i] = true
            console.log(str[index]);
            for(let k of str[index]) {
                path.push(k)
                if(index + 1 < str.length) {
                    traceback(str, index + 1)
                }
                
                path.pop()
            }
        // }
    }
    traceback(str, 0)
    return result
};

letterCombinations('23')