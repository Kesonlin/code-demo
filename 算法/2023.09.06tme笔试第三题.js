// “好二叉树”：当且仅当该二叉树所有节点的孩子数量为偶数（0或者2）
// 小红想知道，n个节点组成的好二叉树，共有多少种不同的形态？
// 答案请对10^9+7取余

const mod = Math.pow(10, 9) + 7;

const getKins = (all, want) => {
  let a = 1;
  for (let i = 0; i < want; i++) {
    a *= all - i;
  }

  let b = 1;
  for (let i = 1; i <= want; i++) {
    b *= i;
  }

  return a / b;
};

// const res = getKins(1, 1);
// console.log(res);

const fn = (parent, ret) => {
  if (ret === 0) {
    return 1;
  }
  let ans = 0;
  for (let i = 1; i <= parent; i++) {
    if (ret - 2 * i >= 0) {
      //   let t = 1;
      // 多少种选择 组合
      const t = getKins(parent, i);
      //   console.log("t", t);
      ans += (t * fn(i * 2, ret - 2 * i)) % mod;
    }
  }

  return ans;
};

const main = (n) => {
  //   console.log("ans", ans);
  const ans = fn(1, n - 1);
  console.log("ans", ans);
};

main(9);
