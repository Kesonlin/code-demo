function sleep1(time) {
  const start = Date.now();

  while (Date.now() - start < time) {}

  console.log("延迟结束");
}

function sleep2(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
async function sleep3(time) {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

sleep1(1000);

console.log("222");
