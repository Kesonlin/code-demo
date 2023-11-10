function typeData(obj) {
    if(typeof obj == 'object' && obj == null) {
        return 'null'
    } else if(typeof obj === 'object') {
        const objClass = Object.prototype.toString.call(obj)
        type = objClass.split(' ')[1].split('')
        type.pop()

        return type.join('').toLowerCase()
    } else {
        return typeof obj
    }
}

const fn = function() {

}

const fn1 = () => {}

const data = new Date()

const sy = Symbol()

const res = typeData(undefined)

console.log(res); 

console.log(Object.prototype.toString.call(null));
console.log(Object.prototype.toString.call(undefined));
console.log(Object.prototype.toString.call(12));