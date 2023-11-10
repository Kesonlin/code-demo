const getAns = (h, m) => {
  const hM = h * 5;
  const all = Math.abs(hM - m);

  return Math.min((360 * all) / 60, 360 - (360 * all) / 60);
};

const ans = getAns(0, 55);
console.log(ans);
