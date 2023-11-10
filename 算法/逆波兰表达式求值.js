/**
 * @param {string[]} tokens
 * @return {number}
 */
 var evalRPN = function(tokens) {
    const stack = []
    for(let v of tokens) {
        console.log(stack);
        switch(v) {
            case '+': {
                const val1 = stack.pop(), val2 = stack.pop()
                stack.push(val1 + val2)
                break;
            }
            case '-': {
                const val1 = stack.pop(), val2 = stack.pop()
                stack.push(val2 - val1)
                break;
            }
            case '*': {
                 const val1 = stack.pop(), val2 = stack.pop()
                stack.push(val1 * val2)
                break;
            }
             case '/': {
                 const val1 = stack.pop(), val2 = stack.pop()
                stack.push(Math.floor(val2 / val1))
                break;
            }
            default: {
                stack.push(Number(v))
            }
        }
    }
    return stack.pop()
};

evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"])