var spiralOrder = function (matrix) {
    const m = matrix.length
    const n = matrix[0].length
    const ans = []

    let start = 0

    while (ans.length < m * n) {
        for (let i = start; i < n - start; i++) {
            ans.push(matrix[start][i])
        }
        console.log(11);
        for (let i = start + 1; i <= m - 1 - start; i++) {
            ans.push(matrix[i][n - 1 - start])
        }

        if (ans.length >= m * n) break

        for (let i = n - 2 - start; i >= start; i--) {
            ans.push(matrix[m - 1 - start][i])
        }

        for (let i = m - 2 - start; i > start; i--) {
            ans.push(matrix[i][start])
        }
        console.log(ans);
        start++
    }
    console.log(ans);
    return ans
};

spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]])


