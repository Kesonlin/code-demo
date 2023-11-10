// import { myPromise } from './myPromise.js'
const myPromise = require('./myPromise.js')
new Promise((resolve, reject) => {
    console.log(123);
    // resolve('是否异步')

    /**
     * 以下代码会报错
     * setTimeout(() => {
     *  throw '123'
     * })
     */
    
}).then((res) => {
    console.log(res);
    return new Promise((resolve, reject) => {
        resolve('promise链式调用')
    })
}).then((res) => {
    console.log(res);
}, (err) => {
    console.log(err);
})


/**
 * 用try catch捕获不到异步代码的错误
 * 所以下面这段代码会报错
 */
// try {
//     setTimeout(() => {
//         throw 'err'
//     })
// } catch(e) {
//     console.log(err);
// }

new Promise((resolve, reject) => {
    resolve('OK')
    // reject('exx')
}).catch(e => {
    console.log(e);
})

new Promise((resolve, reject) => {
    resolve('OK123')
    console.log(999);
}).then(r => {
    console.log(r);
})

new myPromise((resolve, reject) => {
    resolve('myOK123')
    console.log('my999');
}).then(r => {
    console.log(r);
})