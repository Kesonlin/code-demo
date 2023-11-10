/**
 * filter 
 * 创建一个数组，这个数组包含通过所提供函数实现的测试的所有元素
 */

const arr = [1, 2, 3, 4]

const arr1 = arr.filter((value, index, array) => {
    return value > 2
})

console.log(arr1);  // [ 3, 4 ]

function filter(array, callback) {
    const arr = []
    for(let i = 0; i < array.length; i++) {
        const res = callback(array[i], i, array)
        res && arr.push(array[i])
    }
    return arr
}

const arr2 = filter(arr, (value) => {
    return value > 2
})

console.log(arr2);

/**
 * find
 * 返回数组中满足提供的测试函数的第一个元素的值，否则返回undefined
 */

const arr3 = arr.find((value, index, array) => {
    return value > 2
})

console.log(arr3);

function find(array, callback) {
    for(let i = 0; i < array.length; i++) {
        const res = callback(array[i], i, array)
        if(res) {
            return array[i]
        }
    }

    return undefined
}

const arr4 = find(arr, (value, index) => {
    return index == 2
})

console.log(arr4);  // 3

