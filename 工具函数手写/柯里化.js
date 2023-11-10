function curry(fn, len = fn.length) {
    return _curry.call(this, fn, len)
}

function _curry(fn, len, ...args) {
    // console.log(args);
    return function (...params) {
        const arg = [...args, ...params]
        if (arg.length >= len) {
            const res = fn.call(this, ...arg)

            return res
        } else {
            return _curry(fn, len, ...arg)
        }
    }
}

const _fn = (a, b, c) => a + b + c

const fn = curry(_fn, 3)
console.log(fn(1)(2)(3));
console.log(fn(2));
console.log(fn(3));
console.log(fn(3));

// console.log({}.toString());
console.log({} == 6);