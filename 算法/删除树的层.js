console.log(['1', '2', '3'].join());
console.log([1, 2, 3].includes(2));

const getPath = (path) => {
    if(!path.length) return
    path[0] = '{' + path[0]
    path[path.length - 1] = path[path.length - 1] + '}'
    console.log(path.join());
    // ans.push(path.join())
}

getPath([1, 2, 3])



console.log(7 | 2);
console.log(4 | 3);
console.log(6 | 3);