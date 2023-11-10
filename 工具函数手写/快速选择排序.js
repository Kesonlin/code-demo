function quick(arr, start, end) {
  if (start >= end) return;

  //   const mid = Math.floor((start + end) / 2);
  const pivot = arr[start];
  let left = start;
  let right = end;

  while (left < right) {
    while (left < right && arr[right] >= pivot) {
      right--;
    }

    while (left < right && arr[left] <= pivot) {
      left++;
    }

    if (right > left) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      //   left++, right--;
    }
  }

  console.log(arr);

  const temp = arr[left];
  console.log("pivot", pivot);
  arr[left] = pivot;
  arr[start] = temp;

  quick(arr, start, left - 1);
  quick(arr, left + 1, end);
}

const nums = [1, 2, 3, 1, 18, 3, 0, 0, 0];
quick(nums, 0, nums.length - 1);
console.log("final: ", nums);
