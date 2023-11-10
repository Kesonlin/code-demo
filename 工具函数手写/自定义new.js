/**
 * 
 * @param {构造函数} fn 
 * @param  {参数} args 
 * 
 * new关键字会进行如下操作：
 * 1. 创建一个空对象
 * 2. 将空对象的__proto__添加到构造函数的原型上
 * 3. 将this指向创建的对象
 * 4. 如果该函数没有返回对象，则返回this
 * 
 */
function newInstance(fn, ...args) {
    const obj = {}
    obj.__proto__ = fn

    const result = fn.call(obj, ...args)

    return result instanceof Object ? result : obj
}

function Car(a, b) {
    this.a = a
    this.b = b
    // return {}
}

const car = newInstance(Car, 1, 2)

console.log(car);   // Function { a: 1, b: 2 }
console.log(car.a);  // 1