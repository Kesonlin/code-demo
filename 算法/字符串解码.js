var decodeString = function (s) {
    const len = s.length
    let str = ''
    const stack = []
    for (let i = 0; i < len; i++) {
        if (s[i] == ']') {
            let ss = stack.pop()
            let str1 = ''
            while (ss != '[') {
                str1 = ss + str1
                ss = stack.pop()
            }
            let num = ''
               ss = stack.pop()
            while (ss >= '0' && ss <= '9') {
                
                num = ss + num
                ss = stack.pop()
            }
            stack.push(ss)
            console.log(+num);
            for (let i = 0; i < +num; i++) {
                stack.push(str1)
            }
        } else {
            stack.push(s[i])
        }
    }

    return stack.join('')
};

const res = decodeString('"3[a]2[bc]"')
console.log(res);