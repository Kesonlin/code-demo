function mySetInterval(cb, time) {
    let timer = {}
    function fn(cb, time) {
        const tId = setTimeout(() => {
            cb()

            fn(cb, time)
        }, time)
        timer.id = tId

    }

    fn(cb, time)
    return timer

}

function myClear(timer) {
    clearTimeout(timer.id)
}

// const timer = mySetInterval(() => {
//     console.log(1);
// }, 1000)

// // console.log(id);

// setTimeout(() => {
//     myClear(timer)
// }, 5000)

function mySetInterval1(fn, timeout) {
    // 控制器，控制定时器是否继续执行
    var timer = {
        flag: true
    };
    // 设置递归函数，模拟定时器执行。
    function interval() {
        if (timer.flag) {
            fn();
            setTimeout(interval, timeout);
        }
    }
    // 启动定时器
    setTimeout(interval, timeout);
    // 返回控制器
    return timer;
}

const timer = mySetInterval1(() => {
    console.log(1);
}, 1000)

setTimeout(() => {
    timer.flag = false
}, 5000)