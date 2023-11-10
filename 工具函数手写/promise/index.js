import { myPromise } from "./myPromise/index.js";

setTimeout(() => {
    console.log('宏任务');
})

const p = new myPromise((resolve, reject) => {
    // resolve('OK')
    // reject('err123')
    // throw '抛出错误'
    setTimeout(() => {
        resolve('异步的')
    })
})

p.then((res) => {
    console.log('第一层成功的', res);
    // return new myPromise((resolve, reject) => {
    //     resolve('链式调用中then里面返回的是myPromise')
    // })
    throw 'err6666'
}, (err) => {
    console.log('第一层失败的', err);
    throw 'err'
}).then((res) => {
    console.log('myPromise链式调用', res);
}, (err) => {
    // console.log(this);
    console.log('第二层失败的', err);
})

new myPromise((resolve, reject) => {
    resolve('OK')
    // reject('exx')
}).catch(e => {
    console.log(e);
})


myPromise.myResolve('123').then((res) => {
    console.log(res);
})

myPromise.myReject('456').then((res) => {
    console.log(res);
}, err => {
    console.log(err);
})

myPromise.myAll([new myPromise((resolve, reject) => {
    resolve('OK')
}), new myPromise((resolve, reject) => {
    resolve('OK')
}), new myPromise((resolve, reject) => {
    reject('eeeeee')
}), new myPromise((resolve, reject) => {
    resolve('OK')
})]).then(res => {
    console.log(res);
}, err => {
    console.log(err);
})

myPromise.myRace([new myPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('OK11')
    }, 100)
}), new myPromise((resolve, reject) => {
    resolve('OK123')
}), new myPromise((resolve, reject) => {
    reject('eeeeee')
}), new myPromise((resolve, reject) => {
    resolve('OK')
})]).then(res => {
    console.log(res);
}, err => {
    console.log(err);
}).myFinally((res) => {
    console.log(res);
})


console.log('末尾的同步代码');