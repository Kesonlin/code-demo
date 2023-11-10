/**
 * 数组扁平化
 * 将多维的数组放到一个一维的新数组中
 * 
 * 
 */

/**
 * 方法一：递归 + reduce + concat
 */

function flatten1(array) {
    return array.reduce((pre, item) => {
        // 若该元素是一个数组，若数组里面没有元素是数组的话，直接concat就好了，否则就要递归
        if (Array.isArray(item) && item.some(cItem => Array.isArray(cItem))) {
            return pre.concat(flatten1(item))
        } else {
            return pre.concat(item)
        }
    }, [])
}


const array = [1, [2, 3, [4, 5]], 6]

const res = flatten1(array)

// console.log(res);  // [ 1, 2, 3, 4, 5, 6 ]

/**
 * 方法二：... + some() + concat()
 */

function flatten2(array) {
    let arr = [].concat(...array)
    while (arr.some(item => Array.isArray(item))) {
        console.log(arr);
        arr = [].concat(...arr)
    }

    return arr
}

// console.log([].concat([1, 2], 3, [4, 5]));  // [ 1, 2, 3, 4, 5 ]

console.log(...array);
// const array1 = [...array]
// console.log(...array1);

const res2 = flatten2(array)

console.log(res2);

const a = [1, 2, 3, 9]
console.log(a.concat(88, [7, 77]));
// console.log(a);

function flatten(arr) {
    arr.reduce((pre, item) => {
        if (Array.isArray(item) && item.some(cItem => Array.isArray(cItem))) {
            return pre.concat(flatten(item))
        } else {
            return pre.concat(item)
        }
    }, [])
}

console.log('.........................');

function flatten3(arr) {
    // concat可以有多个参数，参数可以是单个元素，也可以是数组，最后都会合并成一个数组
    let res = [].concat(...arr)
    while (res.some(item => Array.isArray(item))) {
        console.log(res);
        res = [].concat(...res)
    }
    console.log(res);
    return res
}

const b = [1, [2, 3, [4, 5]], 9]

flatten3(b)

// console.log(...b);

function flatten4(array) {

    return array.reduce((pre, item) => {
        if (Array.isArray(item) && item.some(val => Array.isArray(val))) {
            return pre.concat(flatten4(item))
        } else {
            return pre.concat(item)
        }
    }, [])
}

function flatten5(array) {
    const ans = [].concat(...array)

    while (ans.some(val => Array.isArray(val))) {
        ans = [].concat(...ans)
    }

    return ans
}