// const readline = require('readline')


function fn() {
    // const words = readline()
    const words = 'Corona(Trump)USA<<<Virus'
    let result = ''
    let r = ''
    for(let i = 0; i < words.length; i++) {
        const s = words[i]
        switch(s) {
            case '(':
                result += r
                r = ''
            case ')':
                break
            case '<':
                r = ''
                break
            default:
                r += s
        }
    }
    if(r) {
        result += r
    }
    
    return result
    }

    const res = fn()
    console.log(res);