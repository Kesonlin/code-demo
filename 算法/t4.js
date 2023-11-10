const readline = require("readline");

function main(str) {
  // const str = await readline()
  const len = str.length;
  let index = 0;

  let x = 0;
  let y = 0;
  while (index < len) {
    const dir = str[index];
    index++;
    let steps = "";
    while (index < len && str[index] >= "0" && str[index] <= "9") {
      steps = steps + str[index];
      index++;
    }
    steps = parseInt(steps);
    switch (dir) {
      case "e": {
        x += steps;
        break;
      }

      case "w": {
        x -= steps;
        break;
      }

      case "n": {
        y += steps;
        break;
      }

      case "s": {
        y -= steps;
        break;
      }
    }
  }

  console.log(x, y);
}

// main("e1s1w2n3");

function main5(menus, rules) {
  const len = rules.length;

  const dfs = (root) => {
    const children = root.children;
    if (!children || children.length === 0) {
      //   console.log(root);
      return rules.includes(root.id);
    }
    const len = children.length;
    let flag = false;

    for (let i = 0; i < len; i++) {
      const val = dfs(children[i]);
      if (!val) {
        children[i] = null;
      } else {
        flag = true;
      }
    }

    let j = 0;
    for (let i = 0; i < len; i++) {
      if (children[i] !== null) {
        children[j] = children[i];
        j++;
      }
    }
    children.length = j;

    return flag || rules.includes(root.id);
  };

  dfs(menus);
  console.log(JSON.stringify(menus));
  console.log(JSON.stringify(menus) === JSON.stringify(ans1));
  return menus;
}

const obj = { id: "0", children: [{ id: "1" }, { id: "2" }, { id: "3" }] };
const obj1 = {
  id: "0",
  children: [
    {
      id: "1",
      children: [
        { id: "11", children: [{ id: "111" }, { id: "112" }] },
        { id: "12", children: [{ id: "121" }, { id: "122" }] },
      ],
    },
    {
      id: "2",
      children: [
        { id: "21", children: [{ id: "211" }, { id: "212" }] },
        { id: "22", children: [{ id: "221" }, { id: "222" }] },
      ],
    },
    { id: "3" },
  ],
};

const rules = ["1", "2"];
const rules1 = ["11", "22", "3"];

const ans1 = {
  id: "0",
  children: [
    { id: "1", children: [{ id: "11", children: [] }] },
    { id: "2", children: [{ id: "22", children: [] }] },
    { id: "3" },
  ],
};

// main5(obj1, rules1);

async function main2(T, datas) {
  const perGame = (data) => {
    const n = data.length;
    const m = data[0].length;

    const burns = new Map();
    // 获取所有炸弹爆炸的时刻
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        const val = data[i][j];
        if (data[i][j] != 1 && data[i][j] != -1) {
          if (burns.has(val)) {
            const t = burns.get(val);
            T.push([i, j]);
          } else {
            burns.set(val, [[i, j]]);
          }
        }
      }
    }

    const check = (pos, burns) => {
      if (pos[0] >= n || pos[1] >= m) return false;
      for (let i = 0; i < burns.length; i++) {
        if (pos[0] === burns[0] || pos[1] === burns[1]) {
          return false;
        }
      }

      return true;
    };

    let steps = 0;
    const pos = [0, 0];

    const track = (pos, steps) => {
      if (pos[0] === n - 1 && pos[1] === m - 1) {
        return steps;
      }

      let ans = Number.MAX_SAFE_INTEGER;
      if (burns.has(steps + 1)) {
        const b = burns.get(steps + 1);
        const newPos1 = [pos[0] + 1, pos[1]];
        if (check(newPos1, b)) {
          const v = track(newPos1, steps + 1);
          ans = Math.min(ans, v);
        }

        const newPos2 = [pos[0] - 1, pos[1]];
        if (check(newPos2, b)) {
          const v = track(newPos2, steps + 1);
          ans = Math.min(ans, v);
        }

        const newPos3 = [pos[0], pos[1] + 1];
        if (check(newPos3, b)) {
          const v = track(newPos3, steps + 1);
          ans = Math.min(ans, v);
        }

        const newPos4 = [pos[0], pos[1] - 1];
        if (check(newPos4, b)) {
          const v = track(newPos4, steps + 1);
          ans = Math.min(ans, v);
        }
      }

      return ans;
    };
  };
}

main2();
