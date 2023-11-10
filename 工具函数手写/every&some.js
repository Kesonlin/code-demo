/**
 * every 
 * 测试所以数组中的元素是否都可以满足测试函数
 * 返回一个布尔值
 */

const array = [1, 2, 3, 4]

const res = array.every((value, index, array) => {
    return value >= 1
})

console.log(res);  // true




function every(array, callback) {
    let len = array.length
    for (let i = 0; i < len; i++) {
        const res = callback(array[i], i, array)
        if (!res) {
            return false
        }
    }

    return true
}

const res1 = every(array, (value, index, array) => {
    return value >= 1
})

console.log(res1);  // true

/**
 * some
 * 只要有一个数组元素满足测试函数即可
 * 返回布尔值
 */

const res2 = array.some((value, index, array) => value >= 3)

console.log(res2); // true

function some(array, callback) {
    let len = array.length
    for (let i = 0; i < len; i++) {
        const res = callback(array[i], i, array)
        if (res) {
            return true
        }
    }

    return false
}

const res3 = some(array, (value, index, array) => {
    return value < 1
})

console.log(res3);  // false