// 实现一个HardMan函数，能链式调用study()、rest()、restFirst()函数，
// 其中rest()作用是其后面的链式调用延迟5s，
// restFirst()作用是使整条链式调用延迟10s；
class HardMan {}

function HardMan(str) {
  this.queue = [];
  this.name = str;
  console.log(this.name);
}

HardMan.prototype.rest = function (wait) {
  const that = this;
  const func = () => {
    setTimeout(() => {
      console.log(`Start learning after ${wait} seconds`);
      // debugger;
      that.next();
    }, wait * 1000);
  };
  this.queue.unshift(func);
  return this;
};

HardMan.prototype.restFirst = function (wait) {
  this.queue = this.queue.map(v => {
    return () => {
        setTimeout(() => {
            v()
            this.next()
        }, wait * 1000)
    }
  })
  return this;
};

HardMan.prototype.learn = function (str) {
  const func = () => {
    console.log(str);
  };
  this.queue.push(func);
  this.next();
};

HardMan.prototype.next = function () {
  if (this.queue.length === 0) return;
  const func = this.queue.shift();
  func();
};
