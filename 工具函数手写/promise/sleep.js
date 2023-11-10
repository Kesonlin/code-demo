function sleep(duration) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, duration)
    })
}

async function changeColor(color) {
    console.log(color);
    await sleep(2000)
} 

async function main() {
    while(true) {
        await changeColor('red')
        await changeColor('green')
        await changeColor('yellow')
    }
}

// main()

function light() {
    Promise.resolve()
        .then(r => {
            // console.log(r);
            return new Promise(resolve => {
                setTimeout(() => {
                    console.log('red');
                    resolve()
                }, 1000)
            })
        })
        .then(r => {
            return new Promise(resolve => {
                setTimeout(() => {
                    console.log('green');
                    resolve()
                }, 1000)
            })
        })
        .then(r => {
            return new Promise(resolve => {
                setTimeout(() => {
                    console.log('yellow');
                    resolve()
                }, 3000)
            })
        })
        .then(light)
}

light()