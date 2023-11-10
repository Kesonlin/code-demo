// 构造字符串，字符串仅由小写字母组成，每种小写字母都出现了至少2次，
// 对于任意小写字母，该字母在字符串中出现下标的最短距离恰好等于k
// 1 <= k <= 25

const mian = (k) => {
  const arr = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
  ];
  let pos = 0;
  let str = "";

  while (pos < 26) {
    const temp = arr.slice(pos, pos + k).join("");
    console.log("temp", temp);
    str += temp + temp;
    pos += k;
  }
  console.log(str);
};

mian(25);
