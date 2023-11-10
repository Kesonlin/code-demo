// 定义完美数：当且仅当改数仅有一个非零数字，例如 5000， 1， 0。
// 小红拿到一个大小为n的数组，她希望选择两个元素，满足乘机为完美数。
// 共有多少种不同的取法：

const isPerfect = (num) => {
  let count = 0;

  while (num) {
    const val = num % 10;
    if (val !== 0) count++;
    if (count > 1) return false;
    num = Math.floor(num / 10);
  }

  return count === 1;
};

const main = (nums) => {
  const len = nums.length;
  const ans = [];
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      const val = nums[i] * nums[j];
      if (isPerfect(val)) {
        ans.push(val);
      }
    }
  }

  console.log(ans);
  console.log(ans.length);
};

const num = [25, 2, 1, 16, 25];
main(num);
