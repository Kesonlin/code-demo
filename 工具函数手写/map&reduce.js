let array = [1, 2, 3]


/**
 * map传入一个回调函数，三个参数value, index, array（一般是这三个）
 * 返回一个由回调函树的返回值组成的数组
 */
const arr = array.map((value, index, array) => {
    // console.log(value, index, array);
    return index
})

/**
 * 输出
 * 1 0 [ 1, 2, 3 ]
 * 2 1 [ 1, 2, 3 ]
 * 3 2 [ 1, 2, 3 ]
 */

// console.log(arr);  // [ 0, 1, 2 ]

function map(array, callback) {
    const ary = []
    for(let i = 0; i < array.length; i++) {
        ary.push(callback(array[i], i, array))
    }

    return ary

}

const arr1 = map(array, (value) => {
    return value
})

// console.log(arr1);  // [ 1, 2, 3 ]

/**
 * reduce 接受一个回调函数，第一个参数previousValue是上一次遍历回调函数返回的结果，
 * 由于第一次执行回调函数没有“上一次的结果”，所以会把数组索引为0的元素值作为初始值，
 * 所以在没有传入初始值的情况下只会遍历array.length-1次
 * 该函数返回最后一次回调函数的返回值
 */
const arr2 = array.reduce((prevalue, curvalue) => {
    console.log(prevalue, curvalue);
    return 1
})

/**
 * 输出
 * 1 2
 * 1 3
 */


// console.log(arr2);  输出 1

function reduce(array, callback, initValue) {
    let result = initValue
    for(let i = 0; i < array.length; i++) {
        // 判断是否有初始值
      if(!result && i == 0) {
          result = array[i]
          continue
      }
      result = callback(result, array[i], i, array)
    }
    return result
}

const arr3 = reduce(array, (pre, cur) => {
    return pre + cur
})

console.log(arr3);  // 6

Array.prototype._map = function(callback) {
    if(typeof callback != 'function') return
    const ans = []
    const array = [...this]
    for(let i = 0; i < array.length; i++) {
        const res = callback(array[i], i, array)
        ans.push(res)
    }
    return ans
}

const nums = [1, 2, 3]

nums._map((value, index, array) => {
    // array.push(value) 不起作用
    array[index] = value + 1
})

console.log(array);


