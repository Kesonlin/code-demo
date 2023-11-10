function deepCopy(target, map = new WeakMap()) {
    if (!target || typeof target != 'object' || map.has(target)) return target
    const ans = Array.isArray(target) ? [] : {}
    map.set(target, true)
    console.log(target);
    for (let key in target) {
        ans[key] = deepCopy(target[key], map)
    }
    // console.log(ans);
    return ans
}

const obj1 = { a: 1, b: [1, 2, { c: 3 }] }
obj1.d = obj1

const obj2 = deepCopy(obj1)
console.log(obj2);
// obj2.b[0] = 9
// console.log(obj1);  