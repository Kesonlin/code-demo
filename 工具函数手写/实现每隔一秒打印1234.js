function print() {
    // 第一种方式
    for (let i = 1; i <= 4; i++) {
        setTimeout(() => {
            console.log(i);
        }, i * 1000)
    }

    // 第二种方式
    for (var i = 1; i <= 4; i++) {
        (function (i) {
            setTimeout(() => {
                console.log(i);
            }, i * 1000)
        })(i)
    }

    // 第三种方式
    let j = 1
    const timeId = setInterval(() => {
        console.log(j++);
        if (j == 5) {
            clearInterval(timeId)
        }
    }, 1000)
}


// console.log(j);

print()