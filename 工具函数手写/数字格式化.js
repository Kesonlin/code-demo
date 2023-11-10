function transDate(data) {
    let ans = ''
    let temp = data

    let i = 0
    while (temp != 0) {
        if (i != 0 && i % 3 == 0) {
            ans = ',' + ans
        }
        const val = temp % 10
        temp = Math.floor(temp / 10)
        ans = val + ans
        i++

    }

    return ans
}

const res = transDate(1234567899900)

console.log(res);

// 