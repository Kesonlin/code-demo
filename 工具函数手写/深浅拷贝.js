function shallowCopy(obj) {
    if(!obj || typeof obj != 'object') return
    const newObj = Array.isArray(obj) ? [] : {}
    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            newObj[key] = obj[key]
        }
    }
    return newObj
}

const obj = {
    a: 1,
    b: {
        c: 2
    }
}

const o1 = shallowCopy(obj)

console.log(o1);
o1.a = 2
o1.b.c = 3
console.log(o1);
console.log(obj);

const o2 = JSON.parse(JSON.stringify(obj))
o2.b.c = 5
console.log(o2);
console.log(obj);
