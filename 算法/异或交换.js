function swap(a, b) {
  a = a ^ b;
  b = a ^ b;
  a = a ^ b;

  console.log(a, b);
}

swap(8, 0);
