/**
 * instanceof
 * 该运算符用于监测构造函数的prototype属性上是否出现在否个实例对象的原型链上
 * 语法：object instanceof constructor
 * 用于监测constructor.prototype是否在object的原型链上
 */

function myInstanceof(obj, constructorFn) {
    let prototype = obj.__proto__
    while(prototype != null) {
        if(constructorFn.prototype == prototype) {
            return true
        }
        prototype = prototype.__proto__
    }

    return false 
}

function Car() {

}

const car = new Car()

console.log(car instanceof Car);  // true

const res = myInstanceof(car, Car)
const res1 = myInstanceof(car, Function)

console.log(res);  // true
console.log(res1);  // false
console.log(car instanceof Function);  // false
console.log(car instanceof Object);  // true

// console.log(myInstanceof(null, Object));