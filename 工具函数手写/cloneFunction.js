function fn(a) {
  console.log("a", a);
  if (true) {
    console.log(true);
  }
}

const fn1 = (b) => {
  console.log("b", b);
};

function cloneFunction(func) {
  const funcString = func.toString();
  if (!func.prototype) {
    return eval(funcString);
  }
  console.log("funcstring", funcString);
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  //   const bodyReg = /(?<={)[^}]*(?=})/m;
  const body = bodyReg.exec(funcString);
  const test = bodyReg;
  //   console.log(body?[0]);
  console.log(body);
}

const cloneFn1 = cloneFunction(fn1);
cloneFn1("bbb");
// fn(11);
const cloneFn2 = cloneFunction(fn);
