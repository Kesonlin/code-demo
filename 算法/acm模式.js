
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.on('line', (line) => {
    // var tokens = line.split(' ');
    // console.log(parseInt(tokens[0]) + parseInt(tokens[1]));
    console.log(line[0]);
})

// while(line = readline()) {
//     console.log(line);
// }