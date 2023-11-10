/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
 var zigzagLevelOrder = function(root) {
    if(!root) return []
    const queue = [root]
    const result = []
    let flag = true
    while(queue.length) {
        const len = queue.length
        const res = new Array(len)
            for(let i = 0; i < len; i++) {
                const node = queue.shift()
                const index = flag ? i : len - 1 - i
                // res.push(node.val)
                res[index] = node.val
                node.left && queue.push(node.left)
                node.right && queue.push(node.right)
            }
            flag = !flag
        // if(!flag) res.reverse()
        result.push(res)
        flag = !flag
    }

    return result
};