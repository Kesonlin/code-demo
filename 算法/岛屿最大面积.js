// [0,0,1,0,0,0,0,1,0,0,0,0,0],
// [0,0,0,0,0,0,0,1,1,1,0,0,0],
// [0,1,1,0,1,0,0,0,0,0,0,0,0],
// [0,1,0,0,1,1,0,0,1,0,1,0,0],
// [0,1,0,0,1,1,0,0,1,1,1,0,0],
// [0,0,0,0,0,0,0,0,0,0,1,0,0],
// [0,0,0,0,0,0,0,1,1,1,0,0,0],
// [0,0,0,0,0,0,0,1,1,0,0,0,0]


// [0,1,0,0,1,1,0,0,1,0,1,0,0],
// [0,1,0,0,1,1,0,0,1,1,1,0,0],
// [0,0,0,0,0,0,0,0,0,0,1,0,0],


// [0, 0, -1, 0, 0, 0, -1, 0, 0, 0, ][    0, 0, 0, 0, 0, 0,    0, -1, -1, -1, 0, 0,    ][    0, -1, -1, 0, -1, 0,     0, 0, 0, 0, 0, 0,    0],    0, -1, 0, 0, -1, -1, 0, 0, -1, 0, -1, 0,][0, -1, 0, 0, -1, -1,0, 0, -1, -1, -1, 0,][0, 0, 0, 0, 0, 0,0, 0, 0, 0, -1, 0,][0, 0, 0, 0, 0, 0, 0, -1, -1, -1, 0, 0,][0, 0, 0, 0, 0, 0,0, -1, -1, 0, 0, 0,]

/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function (grid) {
    if (!grid && !grid.length) return 0
    let max = 0
    const m = grid.length, n = grid[0].length
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] == 1) {
                const res = dfs(grid, i, j)
                console.log(res);
                max = Math.max(max, res)
            }
            // if(i == 3 && j == 8) {
            //     console.log(grid);
            // }

        }
    }

    console.log(grid);
    return max
};


const dfs = (grid, m, n) => {
    console.log('m=' + m + 'n=' + n);
    grid[m][n] = -1
    // if(m == 4 && )
    let res = 1
    if (m > 0 && grid[m - 1][n] == 1) {
        res += dfs(grid, m - 1, n)
    }

    if (m < grid.length - 1 && grid[m + 1][n] == 1) {
        // console.log('m=' + m + 'n=' + n);
        const a = dfs(grid, m + 1, n)
        // console.log('aaaaa', a);
        res += a
        // console.log('后', res);
    }

    if (n > 0 && grid[m][n - 1] == 1) {
        res += dfs(grid, m, n - 1)
    }

    if (n < grid[0].length - 1 && grid[m][n + 1] == 1) {
        res += dfs(grid, m, n + 1)
    }


    return res
}

const array = [[0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0], [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0]]

const res = maxAreaOfIsland(array)
console.log(res);
