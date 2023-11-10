function findMidSubString(subStr, str) {
    let subStrArrs = {};
    // 敏感词字符频数数组
    let strArrs = {};
    // 发布内容字符频数数组
    let subLength = -1;
    let minStr = '';
    for (let i of subStr) {
        subStrArrs[i] = (subStrArrs[i] || 0) + 1;
        strArrs[i] = 0;
    }
    for (let j = 0; j < str.length; j++) {
        for (let i of subStr) {
            strArrs[i] = 0;
        }
        for (let k = j; k < str.length; k++) {
            if (strArrs[str[k]] !== null) {
                strArrs[str[k]] = strArrs[str[k]] + 1;
            }
            let match = true;
            for (let i of subStr) {
                match = match && (subStrArrs[i] <= strArrs[i]);
            }
            let distance = k - j + 1;
            if (match && (subLength === -1 || subLength > distance) && distance < subStr.length + 5) { 
                subLength = distance; 
                minStr = str.substr(j, subLength); 
            }
        }
    } return minStr;
}
console.log(findMidSubString('byte', 'bytedance') !== "" ? "YES" : "NO"); 
console.log(findMidSubString('byte', 'btoyttyt') !== "" ? "YES" : "NO"); 
console.log(findMidSubString('byte', 'byhellote') !== "" ? "YES" : "NO"); 
console.log(findMidSubString('byte', 'byeeyekey') !== "" ? "YES" : "NO"); 