const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

// 辨别回调函数
let id = 0

class myPromise {
    state = PENDING
    value = ''
    reason = ''
    promiseCallbacks = []
    constructor(execute) {
        console.log('myPromise构造函数执行');
        this.initial(execute)
    }

    resolve(value) {
        if (this.state != PENDING) return

        this.state = FULFILLED
        this.value = value
        // console.log(this);
        if (this.promiseCallbacks.length) {
            this.promiseCallbacks.forEach((value) => {
                value.onFullfiled(this.value)
            })
        }

    }

    reject(reason) {
        if (this.state != PENDING) return
        this.state = REJECTED
        this.reason = reason
        console.log('失败', reason);
        // console.log(this);
        if (this.promiseCallbacks.length) {
            console.log('没有吧');
            this.promiseCallbacks.forEach((value) => {

                value.onRejected(this.reason)
            })
        }
    }

    initial(execute) {
        try {
            execute(this.resolve.bind(this), this.reject.bind(this))
        } catch (e) {
            console.log('执行器里面捕获的错误', e);
            this.reject(e)
        }
    }

    then(onFullfiled, onRejected) {
        onFullfiled = typeof onFullfiled == 'function' ? onFullfiled : res => res
        onRejected = typeof onRejected == 'function' ? onRejected : err => { throw err }
        const promise2 = new myPromise((resolve, reject) => {
            console.log('then方法被调用了');
            console.log(this);
            if (this.state == PENDING) {
                console.log('当前状态为pending状态！');
                this.promiseCallbacks.push({
                    onFullfiled: () => {
                        try {
                            // console.log(this);
                            const result = onFullfiled(this.value)
                            if (result instanceof myPromise) {
                                result.then(res => {
                                    resolve(res)
                                }, err => {
                                    reject(err)
                                })
                            } else {
                                resolve(result)
                            }
                        } catch (e) {
                            console.log('成功的回调', e);
                            reject(e)
                        }
                    },
                    onRejected: () => {
                        try {
                            const result = onRejected(this.reason + 'qqq')
                            if (result instanceof myPromise) {
                                result.then(res => {
                                    resolve(res)
                                }, err => {
                                    reject(err)
                                })
                            } else {
                                resolve(result)
                            }
                        } catch (e) {
                            reject(e)
                        }
                    },
                    id: id++
                })
            } else if (this.state == FULFILLED) {
                setTimeout(() => {
                    try {
                        const x = onFullfiled(this.value)
                        // if (result instanceof myPromise) {
                        //     result.then((res) => {
                        //         resolve(res)
                        //     }, err => {
                        //         reject(err)
                        //     })
                        // } else {
                        //     resolve(result)
                        // }
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        console.log(e);
                    }

                })
            } else {
                console.log('执行失败的');
                setTimeout(() => {
                    try {
                        // console.log(this);
                        const result = onRejected(this.reason)
                        if (result instanceof myPromise) {
                            result.then((res) => {
                                resolve(res)
                            }, err => {
                                reject(err)
                            })
                        } else {
                            resolve(result)
                        }
                    } catch (e) {
                        console.log(e);
                    }

                })
            }
        })
        return promise2
    }

    catch(onRejected) {
        this.then(null, onRejected)
    }

    static myResolve(value) {
        return new myPromise((resolve, reject) => {
            if (value instanceof myPromise) {
                value.then(res => {
                    resolve(res)
                }, err => {
                    reject(err)
                })
            } else {
                resolve(value)
            }
        })
    }

    static myReject(value) {
        return new myPromise((resolve, reject) => {
            if (value instanceof myPromise) {
                value.then(res => {
                    reject(res)
                }, err => {
                    reject(err)
                })
            } else {
                reject(value)
            }
        })
    }

    static myAll(promiseArray) {
        console.log(123);
        const successRes = []
        let count = 0
        // let flag = true
        return new myPromise((resolve, reject) => {
            for (let i = 0; i < promiseArray.length; i++) {
                promiseArray[i].then(r => {
                    successRes.push(r)
                    count++
                    if (count == promiseArray.length) {
                        resolve(successRes)
                    }
                }, e => {
                    // flag = false
                    console.log(e);
                    reject(e)
                })
            }

            // console.log(flag);
            // if(flag) {
            // console.log(999);
            // resolve(successRes)
            // }

        })
    }

    static myRace(promiseArray) {
        return new myPromise((resolve, reject) => {
            for (let i = 0; i < promiseArray.length; i++) {
                promiseArray[i].then(r => {
                    resolve(r)
                }, e => {
                    reject(e)
                })
            }
        })
    }

    myFinally(callback) {
        console.log(666);
        return this.then(callback, callback)
    }




}

myPromise.deferred = function () {
    let result = {};
    result.promise = new myPromise((resolve, reject) => {
        result.resolve = resolve;
        result.reject = reject;
    }); return result;

}

/**
 * 
 * @param {promise} promise2 
 * @param {type} x 
 * @param {*} resolve 
 * @param {*} reject 
 */
function resolvePromise(promise2, x, resolve, reject) {
    if (x == promise2) {
        console.log(true);
        return reject(new TypeError('chaining cycle detected for promise'))
    }

    if (x instanceof myPromise) {
        if (x.PromiseState == PENDING) {
            x.then(y => {
                resolvePromise(promise2, y, resolve, reject)
            }, reject)
        } else if (x.PromiseState == FULFILLED) {
            resolve(x.PromiseResult)
        } else if (x.PromiseState == REJECTED) {
            reject(x.PromiseResult)
        }
    }
    if (x != null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            var then = x.then
        } catch (e) {
            reject(e)
        }
        if (typeof then === 'function') {
            let called = false
            try {
                then.call(x, y => {
                    if (called) return
                    called = true
                    resolvePromise(promise2, y, resolve, reject)
                }, r => {
                    if (called) return
                    called = true
                    reject(r)
                })
            } catch (e) {
                if (called) return
                called = true
                reject(e)
            }
        } else {
            resolve(x)
        }
    } else {
        return resolve(x)
    }

}

// const p = new myPromise((r, j) => {
//     r('OK')
// })

// const p1 = p.then(r => {
//     console.log(r);
//     return p1
// })

// myPromise.myResolve().then(() => {
//     console.log(0);
//     return myPromise.myResolve(4);
//   }).then((res) => {
//     console.log(res)
//   })

//   myPromise.myResolve().then(() => {
//     console.log(1);
//   }).then(() => {
//     console.log(2);
//   }).then(() => {
//     console.log(3);
//   }).then(() => {
//     console.log(5);
//   }).then(() =>{
//     console.log(6);
//   })


// new myPromise((resolve, reject) => {
//     reject('err')
// })

myPromise.myResolve().then(() => {
    return new Error('error!!!')
}).then(res => {
    console.log("then: ", res)
}).catch(err => {
    console.log("catch: ", err)
})

module.exports = myPromise