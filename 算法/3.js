function fn(digits) {
    const array = Array.from(digits).map((value) => {
        num = Number(value)
        const index = (value - 2) * 3 + 97
        return [String.fromCharCode(index), String.fromCharCode(index + 1), String.fromCharCode(index + 2)]
    })

    return array

}

const res = fn('23')

console.log(res);

console.log(res[0].join(''));