/**
 * 将数组拆分成多个size长度的分块，每个区块组成小数组，整体组成一个二维数组
 * 
 * 
 */
function chunk(array, size = 1) {
    if(array.length == 0) {
        return []
    }

    const bigArr = []
    let smallArr = []

    array.forEach(item => {
        // 当smallArr数组长度为0时push，相当于是push了一个地址，这样再往smallArr添加时bigArr也会变化
        if(!smallArr.length) {
            bigArr.push(smallArr)
            console.log(bigArr);
        }
        smallArr.push(item)
        if(smallArr.length == size) {
            // smallArr.length = 0 这种写法是不行的！！！
            smallArr = [] // 此时数组地址会改变！！！
        }
    })

    return bigArr
    
}

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const res = chunk(array, 3)

// console.log(res);

const arr = []
arr.push([])
console.log([].length);