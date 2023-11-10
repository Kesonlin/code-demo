/**
 * 
 * @param {*} target 
 * @param  {...any} sources 
 * Object.assign() 方法将所有可枚举
 * （Object.propertyIsEnumerable() 返回 true）的自有（Object.hasOwnProperty() 
 * 返回 true）属性从一个或多个源对象复制到目标对象，返回修改后的对象。
 */
function myAssign(target, ...sources) {
    if (!target || typeof target !== null || sources.length == 0) return target

    sources.forEach(obj => {
        if (!obj) return
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                target[key] = obj[key]
            }
        }
    })

    return target
}