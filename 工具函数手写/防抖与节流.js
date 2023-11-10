/**
 * 实现函数节流
 * 语法： throttle(callback, wait)
 * 功能： 创建一个节流函数，在wait毫秒内最多执行回调函数一次
 */

function throttle(callback, wait) {
  let start = 0;
  return function (event) {
    console.log("throttle event");
    const current = Date.now(); // 一个number，表示UNIX济源开始到当前时间的毫秒数
    console.log(start);
    // 为什么start等于0？ 因为会先执行第一次，之后再按wait毫秒之后执行
    if (current - start > wait) {
      callback.call(this, event);
      start = current; //
    }
  };
}

const fn = () => {
  console.log(1213);
};

const fn1 = throttle(fn, 3000);

// setInterval(fn1, 1000)

/**
 * 防抖函数，改函数会从上一次调用后，延迟awit毫秒之后调用callback
 * @param {需要防抖的函数} callback
 * @param {*时间间隔} wait
 * @returns
 *
 */
function debounce(callback, wait) {
  let timeoutId = -1;
  return function (event) {
    if (timeoutId !== -1) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      callback.call(this, event);
      timeoutId = -1;
    }, wait);
  };
}

// const fn2 = debounce(fn, 1000)
// setInterval(fn2, 500)  永远不会执行

/**
 * 防抖是用户在连续点击后停下才执行，之后如果在wait毫秒之内在点击的话不会执行函数，会从最后点击之后wait毫秒之后再执行回调
 * 常用于input搜索，用户输入结束之后再调用接口
 * 节流是用户第一次点击之后就执行函数，之后等wait毫秒之后会再次执行
 */

function throttle1(fn, delay) {
  var preTime = Date.now();

  return function () {
    var context = this,
      args = [...arguments],
      nowTime = Date.now();

    // 如果两次时间间隔超过了指定时间，则执行函数。
    if (nowTime - preTime >= delay) {
      preTime = Date.now();
      return fn.apply(context, args);
    }
  };
}

const fnn = throttle1(() => {
  console.log(1);
}, 100);

//   fnn()
//   fnn()
setTimeout(() => {
  fnn();
}, 1000);

console.log(11);

function throttle2(fn) {
  let t;
  return function () {
    if (!t) {
      t = setTimeout(() => {
        fn();
        t = null;
      });
    }
  };
}
