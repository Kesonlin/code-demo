const s = 'abcdefg'

const s1 = s.slice(1)

console.log(s1);
console.log(s.length);
console.log(s.slice(0, 3));
console.log(s.slice(7));

const isHuiWen = (s) => {
    if (!s.length) return false
    if (s.length == 1) return true
    const array = Array.from(s)
    const len = array.length
    for (let i = 0; i < Math.floor(len / 2); i++) {
        if (array[i] != array[len - i - 1]) {
            return false
        }
    }
    return true

}

var partition = function (s) {
    const path = [], result = []
    const backtracing = (s) => {
        if (!s.length) {
            result.push([...path])
            return
        }
        // console.log(path);
        if(s.length == 1) {
            path.push(s)
            result.push([...path])
            path.pop()
            return
        }
        // 此时i要等于字符串的长度，因为切割的是长度而不是索引
        for (let i = 1; i <= s.length; i++) {

            const s1 = s.slice(0, i)
            const s2 = s.slice(i)
            console.log(s1, s2);
            if (isHuiWen(s1)) {
                console.log(77);
                path.push(s1)
                backtracing(s2)
                path.pop()
            }
        }
    }
    backtracing(s)
    return result

};

const res = partition('aab')
console.log(res);