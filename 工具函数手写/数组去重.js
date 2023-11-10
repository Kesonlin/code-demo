/**
 * 方法一：
 * 利用foreach和indexof
 */


function unique1(array) {
    const res = []
    array.forEach((value, index, ) => {
        if(res.indexOf(value) == -1) {
            res.push(value)
        }
    })

    return res
}

const arr1 = unique1([1, 2, 2, 3, 3, '3'])

console.log(arr1);  // [ 1, 2, 3, '3' ]


/**
 * 方法二： 利用forEach 和 对象容器
 * @param {需要去重的数组} array 
 */
function unique2(array) {
    const res = [], obj = []
    array.forEach((value) => {
        if(!obj.hasOwnProperty(value)) {
            obj[value] = true
            res.push(value)
        }
    })

    return res
}

const arr2 = unique2([1, 2, 3, 2, 3, '3'])

console.log(arr2);  // [ 1, 2, 3 ]

/**
 * 方法三：利用set
 */

function unique3(array) {
    return [...new Set(array)]
}

const arr3 = unique3([1, 2, 1, 3, '3'])

console.log(arr3);  // [ 1, 2, 3, '3' ]
