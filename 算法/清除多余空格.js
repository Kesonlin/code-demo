const removeExtraSpaces = (s) => {
    let index = 0, flag = false
    for(let i = 0; i < s.length; i++) {
        if(s[i] != ' ') {
            s[index++] = s[i]
            flag = true
        } else if(flag && i != s.length - 1) {
            s[index++] = ' '
            flag = false
        }
    }
    console.log(index);
    s.length = index
    console.log(s);
    return s
}

removeExtraSpaces(Array.from("  hello world  "))