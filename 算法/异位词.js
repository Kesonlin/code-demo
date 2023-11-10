var isAnagram = function (s, t) {
    const ss = Array.from(s)
    const tt = Array.from(t)

    ss.sort((a, b) => a.charCodeAt() - b.charCodeAt())
    tt.sort((a, b) => a.charCodeAt() - b.charCodeAt())



    console.log(ss.join(''))
    console.log(tt.join(''))
    return ss.join('')
    return ss.join(' ') == tt.join(' ')
};

isAnagram("anagram", "nagaram")