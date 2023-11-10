# 认识promise

promise是解决异步编程的一种方案，可以解决回调地狱等问题，promise是有状态的，它的状态就决定了会执行哪一个回调函数，以下面的例子来解释

* 下面代码封装了一个ajax调用的函数，使用promise封装，最后会返回一个promise实例
* 若接口调用成功，就会执行promise里的resolve这个方法，使promise状态变为成功的，否则执行reject，promise状态变为失败，若都没有执行以上两个方法的话，promise的状态就是peding等待
* promise的状态就决定了then方法会执行哪个回调，成功的就会执行第一个，失败执行第二个

```js
function myAjax(url)
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttprequest()
        xhr.open('get', url)
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200) {
                resolve('接口调用成功！')
            } else {
                reject('接口调用失败！
            }
        }
            xhr.send()
    })
}
                       
myAjax('http://127.0.0.1').then(r => {
   // 这里执行成功的回调 
}, e => {
   // 这里执行失败的回调 
})
```

### promise三个状态

* pending：初始状态，即没有成功，也没有失败
* fulfilled：意味着操作成功
* rejected：意味着操作失败

**promise状态改变时不可逆的，被创建的 promise 最终会以被解决状态 `(fulfilled)` 或 被拒绝状态`(rejected)` 结束，且状态只会改变一次**

另外，规定必须给`Promise`对象传入一个执行函数，否则将会报错！

# 常见promise API

### then

``` js
const p = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('settimeout111')   
            })
        })
p.then(res => {
            console.log(res);
        }, err =>{
    console.warn(err)
})
```

* 可以传入2个回调函数，若该Promise成功时执行第一个函数，失败时执行第二个
* 一个promise可以支持多次执行then方法
* 执行then方法后会返回一个promise实例，
* then无论执行成功的还是失败的回调，若执行后没有返回值，则会返回一个成功的promise， promiseresult为undefined
* 若then里面有返回值, 且返回值不是promise，则也会返回一个成功的promise, promiseresult为返回的值
* 若返回了一个Promise, 则会根据该promise状态来决定then返回的promise的状态
* 若在then里面抛出一个错误后，则会返回一个失败的promise

### catch

* promise为失败时会执行
* promise异常穿透

### Promise.resolve()

* 会返回一个promise
* 若接受的参数不是promis对象，则会返回一个成功的promise
* 若接收的参数为一个promise对象，则返回的promise状态会由该对象决定

### Promise.reject()

* 同样返回一个promise
* 无论该参数是否为promise，最后都会返回一个失败的promise

### all

* 返回一个promise
* 参数为一个数组，数组元素都是promsie对象
* 若该数组中有失败的promise，则返回一个失败的promise, promiseResult为该失败Promise的结果
* 若数组中都是成功的promise, 则返回一个成功的promise, promiseResult为由这些promsie结果组成的数组

### race

* 返回一个promise
* 参数为一个数组，数组元素都是promsie对象
* 会根据参数中第一个完成的promise的状态决定返回的promise成功或失败

# 源码分析

## 初始结构

* 使用类创建一个myPromise类，用常量定义三个状态
* promise会传入一个执行器函数，初始化的时候执行该函数，并先使promise状态设置为pending
* 执行器函数定义了两个形参，分别为resolve， reject，而我们在调用用户传入的执行器函数之后，会把这两个形参换成resolve， reject这两个在promise内部实现好的方法
* **由于执行器函数是用户定义的，resolve和reject方法也不知道会在什么地方使用，由于调用的不确定性，就会产生this的执行问题，所以需要绑定在myPromise实例上，才会有这两个方法**

* 代码如下

```js
// 用常量定义三个状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class myPromise {
    PromiseState = ''
	constructor(execute) {
        initial(execute)
    }
	// 初始化
	initial(execute) {
        this.PromiseState = PENDING
        // 执行执行器函数，传入resolve, reject方法，并绑定this
        execute(this.resolve.bind(this), this.reject.bind(this))
    }
	resolve() {}
	reject() {}
	
}
```

## 实现resolve和reject方法

一开始，我并不知道这两个方法会怎么被实现，但到后面才逐渐理解，用户传入的执行器函数相当于是定义了函数的内容，这个函数会由promise来决定执行的时机，执行器函数里面的两个参数，**在promise里面，会被替换成我们自己定义的resolve和reject方法，但这两个方法到底执行哪一个，跟执行器函数的定义有关**，比如执行器里面会执行第一个参数，就会执行我们定义的resolve方法

### 执行resolve还是reject？

笼统来说，使用promise时，promise状态为成功时，执行resolve方法，状态为失败时，执行reject方法，但成功与否还是由用户和具体语义决定，比如，我们调用ajax接口，接口调用成功即为成功，执行resolve方法，否则执行reject方法

* 执行之后，该promise实例状态就会改变，所以在这两个方法中要改变promise状态
* 这两个方法有一个参数，用来接受用户主动传入的数据，比如ajax调用之后，用户想要拿到调用的结果，就可以把这个结果作为reject或resolve的参数，我们在实例中需要去接收这个参数，并赋值给PromiseResult实例
* promise状态只能改变一次，也就是说，如果有多个resolve或者reject方法，它只会根据代码的执行顺序执行第一个，所以在这两个方法中需要判断promsie状态，若状态不为pending时，即表示已经执行过这两个方法了，则退出什么也不做
* 最后，若执行器函数里代码出现错误的话，会执行reject方法，将promsie状态变为REJECTED，所以要在初始化方法initial中执行器执行里面捕获错误，并将错误原因作为PromiseResult
* 代码如下：

```js

resolve(value) {
    // 先判断状态
    if(this.PromiseState != PENDING) return
    this.PromiseState = FULFILLED
    this.PromiseResult = value
}

reject(error) {
    if(this.PromiseState != PENDING) return
    this.PromiseState = REJECTED
    this.PromiseResult = value
}

// 初始化
	initial(execute) {
        this.PromiseState = PENDING
        // 捕获错误
        try {
           // 执行执行器函数，传入resolve, reject方法，并绑定this
        	execute(this.resolve.bind(this), this.reject.bind(this))
        } catch(e) {
            reject(e)
        }
       
    }
```

## 实现then方法

按照我们使用promise的惯例，我们之后就要使用then方法来处理我们接受到的结果了，then方法的具体用法已经写在上面了，忘记了的可以自行翻阅

在then方法里面，我们一般会传入一个成功的回调，但其实是可以传入两个回调的，第一个是成功的，第二个是失败的（通常在catch方法中处理），手写过程如下：

* 先在myPromise类中定义一个then方法，接受两个参数，第一个为onFulfilled函数，第二个为onRejected函数，用来分别接收用户传入的成功的和失败的回调，同时，这两个参数函数同时也需要参数，这个参数就是执行器函数中传给resolve或reject方法的数据，我们已经用PromiseResult接收了
* 具体执行哪一个回调，需要依据promise状态来决定，所以在then方法中要用this.PromiseState判断promise的状态来决定执行哪一个回调函数
* 具体代码如下：

```js
then(onFulfilled, onRejected) {
    if(this.PromiseState == FULFILLED) {
        onFulfilled(this.PromiseResult)
    } else if(this.PromiseState == REJECTED) {
        onRejected(this.PromiseResult)
    }
}
```

### 回调收集

至此，我们已经实现了简易版的then了，但肯定在学习event loop的时候给promise添加了定时器，那如果我们现在在myPromise里面添加定时器会怎样，如下面：

```js
// 猜猜会输出什么？
new myPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('OK')
    })
}).then(r => {
    console.log(r)
}, e => {
    console.warn(e)
})
```

答案是什么都不会输出！让我们来分析一下：

* new完之后，就会执行执行器内的函数，里面是一个定时器，而定时器是一个异步任务（代码），所以js会先跳过去执行同步代码
* 所以就会执行到then方法，**但是，此时并没有执行resolve或者reject方法中的一个，所以promise的状态仍为pending！**而我们then方法中并没有对状态为pending的判断

**保存回调函数**

我们的原意是能在then里面处理promise异步代码里传入的数据，那既然then方法已经在异步代码之前已经执行完了，所以肯定不能在then里面处理了。仔细思考一下，异步代码执行时会干什么？

是不是会执行resolve或者reject方法，那我们就可以**把then里面的回调函数收集起来，在resolve或者reject方法中执行！**具体做法如下：

* 定义两个数组，命名为onFulfilledCallbacks和onRejectedCallbacks，用来保存then方法中的成功和失败的回调，这里为什么要用数组呢？是因为我们new一个实例p，可以多次执行p.then方法，所以都要把这些回调都收集起来
* 接着，在reslolve或者reject方法中，要判断这两个数组是否为空，不为空的话需要遍历执行每一个回调函数，并传入PromiseResult
* 具体代码如下：

```js
class myPromise {
    ...
    constructor() {
        this.onFulfilledCallbacks = []
        this.onRejectedCallbacks = []
        ...
    }
    resolve(value) {
        ...
        // 执行回调
        if(this.onFulfilledCallbacks.length) {
            onFulfilledCallbacks.forEach(fn => {
                fn(this.PromiseResult)
            })
        }
    } 

	reject(error) {
        ...
        if(this.onRejectedCallbacks.length) {
           onRejectedCallbacks.forEach(fn => {
                fn(this.PromiseResult)
            }) 
        }
    }

	then(onFulfilled, onRejected) {
        // 状态为pending时收集回调
        if(this.PromiseState == PENDING) {
            this.onFulfilledCallbacks.push(onFulfilled)
            this.onRejectedCallbacks.push(onRejected)
        }
        ...
    }
	
}
```

### 实现异步

我们都知道，then方法需要异步执行，比如下面这段代码，会先输出end，再输出OK123，但是，我们现在的myPromise还不能实现这一点

```js
new Promise((resolve, reject) => {
    resolve('OK123')
}).then(r => {
    console.log(r);
})
console.log('end')
```

**具体做法是给then方法加上定时器模拟异步，但因为定时器是一个宏任务，而then其实是一个微任务，所以可以利用mutation observer或者process.nextTick模拟一个微任务**，代码如下:

```js
then(onFulfilled, onRejected) {
    if(this.PromiseState == FULFILLED) {
        setTimeout(() => {
            onFulfilled(this.PromiseResult)
        })
    } else if(this.PromiseState == REJECTED) {
        setTimeout(() => {
            onRejected(this.PromiseResult)
        })   
    }
    ...
}
```

### 链式调用

链式调用就是一直点点点下去，如下面的代码，可以用来解决回调地狱的问题

```js
new Promise((resolve, reject) => {
    resolve('OK')
}).then(r => {
    console.log(r)
}).then(r => {
    console.log(r)
})
```

那么，then方法的链式是怎么实现的呢，我们看到，在执行完then方法之后，我们还可以接着使用promse提供的then，这就说明了**then方法执行完之后还是返回一个promise实例！**then方法返回怎么样的promse实例，具体的规则如下

* then返回的promsie实例的状态由then方法里面执行的回调函数有关，也就是跟onFufilled和onRejected有关

* 若then方法里面的回调函数没有返回值或者返回的不是一个promse实例，则then方法返回一个成功的promise实例，promiseResult为回调函数返回的结果
* 若回调函数里面返回的是一个promsieA，则then方法返回的promise状态由这个promsieA决定，A是成功的则返回成功的promise，失败的则返回失败的promise
* 若回调函数里面抛出错误，则返回一个失败的promsie实例

既然知道了规则，那我们就来开始写吧！先给出我们之前写过的then方法

```js
then(onFulfilled, onRejected) {
    if(this.PromiseState == PENDING) {
        this.onFulfilledCallbacks.push(onFulfilled)
        this.onRejectedCallbacks.push(onRejected)
    } else if(this.PromiseState == FULFILLED) {
        setTimeout(() => {
            onFulfilled(this.PromiseResult)
        })
    } else {
        setTimeout(() => {
            onRejected(this.PromiseResult)
        })   
    }
    ...
}
```



* 首先不管三七二十一，先返回一个promise

  ```js
  then() {
      return myPromise((resolve, rejecte) => {
          
      })
  }
  ```

* 这里要记住，promise里面的代码时同步代码，所以会先执行完里面的代码

* then返回的promsie状态其实是看这里到底执行resolve或者reject方法，所以**接下来就是要判断到底执行resolev或者reject**

* 先思考then方法判断状态不为pending的情况，这种情况下我们会直接执行onFulfilled或者onRejected函数，我们要看看这两个函数返回的结果是什么，判断是否为promise，若不是promise，则直接执行resolve函数，记得把参数传进去

* 若返回的结果是promsie，则需要判断该promsie的状态，那怎么判断呢，是不是可以通过then方法判断，若执行第一个回调则是成功的，第二个回调则是失败的，我们只需要把resolve和reject放在这两个函数中执行就好了

* 若是抛出错误的情况，则直接捕获，执行reject

* 具体代码如下

  ```js
  then(onFulfilled, onRejected) {
      if(this.PromiseState == PENDING) {
          this.onFulfilledCallbacks.push(onFulfilled)
          this.onRejectedCallbacks.push(onRejected)
      } else if(this.PromiseState == FULFILLED) {
          setTimeout(() => {   
              // 捕获错误
              try {
                  // 判断回调的结果是否是promise实例
                  const result = onFulfilled(this.PromiseResult)
                  if(result instanceof myPromise) {
                      myPromise.then(r => {
                          resolve(r)
                      }, e => {
                          reject(e)
                      })
                  } else {
                      resolve(result)
                  }
              } catch(e) {
                  reject(e)
              }
          })
      } else {
          // 写法和上面一样，就不写了。
          setTimeout(() => {
              onRejected(this.PromiseResult)
          })   
      }
  }
  ```

* 接着，来实现then里面判断状态为pending的时候了

* 之前，我们是把回调函数直接放在数组里面，但这样的话还是没有能够判断回调函数里面执行的是什么，所以还是得跟上面的操作一样，判断回调的结果是否是promise等，具体代码如下：

  ```js
  then() {
      ...
      if (this.state == PENDING) {
          // console.log('当前状态为pending状态！');
          this.onFulfilledCallbacks.push.push(
              onFullfiled: () => {
                  try {
                      // console.log(this);
                      const result = onFullfiled(this.PromiseResult)
                      if(result instanceof myPromise) {
                          result.then(res => {
                              resolve(res)
                          }, err => {
                              reject(err)
                          })
                      } else {
                          resolve(result)
                      }
                  } catch(e) {
                      // console.log('成功的回调', e);
                      reject(e)
                  }
              }),
              // 写法也是一样的，就不重复了
              onRejected: () => { }                
  }
  ```

* 注意，这里会把resolve和reject传入到回调函数里面去，所以也涉及到闭包的问题
* 至此，then方法就算完成啦！！！

### 封装resolvePromise

上面书写的过程中，细心的朋友就会发现，我们写了三段重复的代码，所以可以封装成一个函数减少重复代码

* 首先这个函数需要有四个参数，第一个是promise2，为then方法要返回的promise，所以我们不能像之前写的那样直接返回一个promise，得先用一个变量promise2声明我们要返回的promise，再返回promise2;然后第二个参数是x，表示的是onFulfilled或者onRejected返回的结果，即then方法回调返回的结果，第三个参数为resolve，即promise2的resolve方法，用来改变promsie2状态的，同理第四个参数是reject

* 所以，我们先在then函数里面改用这个函数，再来写这个函数的具体代码

* 修改后的then如下：

  ```js
  then(onFulfilled, onRejected) {
      const promise2 = new myPromise((resolve, reject) => {
          if(this.PromiseState == FULFILLED){
              setTimeout(() => {
                      try {
                      	const x = onFulfilled(this.PromiseResult)
                      	resolvePromise(promise2, x, resolve, reject)
                  } catch(e) {
                      reject(e)
                  }
              })
          }
      })
      return promise2
  }
  ```

* 接着，我们把这个函数简单实现一下

```js
/**
 * 
 * @param {promise} promise2  then方法返回的promise
 * @param {*} x then的回调返回的结果
 * @param {*} resolve promise2的resolve方法
 * @param {*} reject  promise2的reject方法
 */
function resolvePromise(promise2, x, resolve, reject) {
    if(x instanceof myPromise) {
        if(x.PromiseState == PENDING) {
            x.then(v => {
                resolve(v)
            }, e => {
                reject(e)
            })
            // 与上面写法不同的是这样写的话当x的状态已经确定的话就不用去执行x.then方法了
        } else if(x.PromiseState == FULFILLED) {
            resolve(x.PromiseResult)
        } else {
            reject(x.PromiseResult)
        }
    } else {
        resolve(x)
    }
}
```

写到这里，是不是以为万事大吉了呀，哈哈哈！怎么可能，勤奋好学的我们怎么能止步于此，接下来就按照promiseA+规范把这个函数完整地写出来，大体的思路就是根据x的类型做不同的处理，emmmm大多数我也是按照网上的博客写的，有的也不是很懂，但先写出来吧，等懂了的话再过来修改。。

* 如果x与promise2相等的话，则抛出一个TypeError错误，虽然这种情况很少见，但封装的过程一定要想到各种情况，下面这种情况就应该报错

  ```js
  const p = new Promise((r, j) => {
      r('OK')
  })
  const p1 = p.then(r => {
      return p1  // TypeError('chaining cycle detected for promise')
  })
  ```

* 如果x是promsie的话，处理的情况就跟之前的差不多

* 如果x是对象或者是函数的时候，将值x.then赋值给then
  * 如果then是一个函数的话，会去调用这个函数，模拟promise.then方法的执行过程，先将this绑定在x上，再传入两个执行器函数
  * 如果then不是一个函数的话。则直接执行resolve(x)

* 如果x都不满足上面的情况，即是一个普通的基本数据类型的值的话，则直接执行resolve(x)
* 具体代码如下：

```js
/**
 * 
 * @param {promise} promise2  then方法返回的promise
 * @param {*} x then的回调返回的结果
 * @param {*} resolve promise2的resolve方法
 * @param {*} reject  promise2的reject方法
 */
function resolvePromise(promise2, x, resolve, reject) {
    if (x === promise2) {
        return reject(new TypeError('Chaining cycle detected for promise'));
    }
    if (x instanceof myPromise) {
         // 与上面写法不同的是这样写的话当x的状态已经确定的话就不用去执行x.then方法了
        if (x.PromiseState === myPromise.PENDING) {
            /**
             * 2.3.2.1 如果 x 处于等待态， promise 需保持为等待态直至 x 被执行或拒绝
             *         注意"直至 x 被执行或拒绝"这句话，
             *         这句话的意思是：x 被执行x，如果执行的时候拿到一个y，还要继续解析y
             */
            x.then(y => {
                resolvePromise(promise2, y, resolve, reject)
            }, reject);
        } else if (x.PromiseState === myPromise.FULFILLED) 
            resolve(x.PromiseResult);
        } else if (x.PromiseState === myPromise.REJECTED) {
            reject(x.PromiseResult);
        }
    } else if (x !== null && ((typeof x === 'object' || (typeof x === 'function')))) {
        // 2.3.3 如果 x 为对象或函数
        try {
            var then = x.then;
        } catch (e) {
            // 因为可能x并没有then这个属性或者其他情况，所以要捕获错误
            return reject(e);
        }

        /**
         * 2.3.3.3 
         * 如果 then 是函数，将 x 作为函数的作用域 this 调用之。
         * 传递两个回调函数作为参数，
         * 第一个参数叫做 `resolvePromise` ，第二个参数叫做 `rejectPromise`
         */
        if (typeof then === 'function') {
            // 2.3.3.3.3 如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
            let called = false; // 避免多次调用
            try {
                // 这个地方大致是模仿promise.then方法的，但有点看不懂
                then.call(
                    x,
                    y => {
                        if (called) return;
                        called = true;
                        resolvePromise(promise2, y, resolve, reject);
                    },
                    r => {
                        if (called) return;
                        called = true;
                        reject(r);
                    }
                )
            } catch (e) {
                if (called) return;
                called = true;
                reject(e);
            }
        } else {
            //  then 不是函数
            resolve(x);
        }
    } else {
        // 如果 x 不为对象或者函数，直接执行resolve
        return resolve(x);
    }
}
```

至此，then方法算是完全写好啦，泪目！

## Promise.resolve(value)

接下来，就是实现Promise的几个静态api了，个人觉得，在面试中，不太可能会让你写then方法这么恶心的，而且需要的时间也特别多，反倒是下面这几个常见的api手写的概率会比较多，因为大多是借助then方法来实现的，写起来花费的时间也不会很多

Promise.resolve有以下几个特点：

* 返回一个promsie，如果value是promise的话，状态由value决定
* 如果value是一个普通值的话，则这个promise状态就是成功的

* 具体代码

```js
static resolve(value) {
    return new myPromise((resolve, reject) => {
        if(value instanceof myPromise) {
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
```

## Promise.reject(value)

无论什么情况，都返回一个失败的promise，代码如下

```js
static reject(value) {
     return new myPromise((resolve, reject) => {
        if(value instanceof myPromise) {
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
```

## Promise.all()

* 接收一个由promise实例组成的数组，并返回一个promsie
* 返回的promise状态由接收的promise实例的状态决定，若数组中出现一个promsie失败的情况，则返回一个失败的promsie，若数组中的promise实例都是成功的，则返回一个成功的promise，promiseResult为各个promsie实例返回的值的组合
* 具体代码如下：

```js
static all(promiseArray) {
    let successValue = [], count = 0
    return new myPromise((resolve, reject) => {
        
        const len = promiseArray.length
    	for(let i = 0; i < len; i++) {
        	promiseArray(i).then(v => {
            	count++
                successValue.push(v)
                if(count == len) {
                    resolve(successValue)
                }
        	}, e => {
            	reject(e)
        	})
    	}
    })
  
}
```

注意，这里不能说直接判断实例中是否有失败的情况，有的话直接执行后退出，没有就执行reoslve方法。因为有些promsie状态在执行all时还是pending，所以根本不会执行then方法，所以有时候该promise本应该是失败的，但最后all方法返回的确实成功的promise

## Promise.race() 

跟all差不多，但返回的promise状态由第一个promsie实例状态改变所决定，具体代码如下：

```js
static race(promiseValue) {
    return new myPromise((resolve, reject) => {   
        const len = promiseArray.length
    	for(let i = 0; i < len; i++) {
            // 若有promsie实例状态已经确定了的话，直接执行resolve或者reject方法
        	promiseArray(i).then(v => {
                resolve(successValue)
                break
        	}, e => {
            	reject(e)
                break
        	})
    	}
    })
}
```

## Promise.prototype.finally()

这不是一个静态方法，而是每个实例都会有的，下面是mdn的解释

> `**finally()**` 方法返回一个 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)。在 promise 结束时，无论结果是 fulfilled 或者是 rejected，都会执行指定的回调函数。这为在 `Promise` 是否成功完成后都需要执行的代码提供了一种方式。
>
> 这避免了同样的语句需要在 [`then()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) 和 [`catch()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) 中各写一次的情况。

也就是说，无论then方法执行哪一个回调，最后都会执行finally里面的回调函数，所以可以利用我们之前写的then方法，将两个回调都传入finally的回调，这样无论then返回什么样的promise，都会执行到finally里面的回调函数，具体代码如下：

```js
finally(callback) {
    return this.then(callback, callback)
}
```

**至此，断断续续写了将近一个星期的promise手写文档也就写好啦！！！虽然还有很多不足的地方，但以后有机会会继续修改的**











