// 象棋马走日字的方法数  象棋中马只能走日字，计算在7×7的棋盘上马从(x0, y0)走到(xn, yn)且走n步的方法数

function fn(x0, y0, xn, yn, n) {
  const NUM = 7;

  function trace(x0, y0, t) {
    if (x0 < 0 || y0 < 0 || x0 >= NUM || y0 >= NUM) return 0;
    if (x0 == xn && y0 == yn && t == n) {
      console.log(`(${x0}, ${y0})`);
      return 1;
    }
    if (t >= n) return 0;
    t++;
    return (
      trace(x0 + 1, y0 + 2, t) +
      trace(x0 - 1, y0 + 2, t) +
      trace(x0 + 2, y0 + 1, t) +
      trace(x0 + 2, y0 - 1, t) +
      trace(x0 + 1, y0 - 2, t) +
      trace(x0 - 1, y0 - 2, t) +
      trace(x0 - 2, y0 - 1, t) +
      trace(x0 - 2, y0 + 1, t)
    );
  }

  return trace(x0, y0, 0);
}

const res = fn(3, 0, 4, 2, 3);
console.log(res);
