/**
 * @param {string} arriveAlice
 * @param {string} leaveAlice
 * @param {string} arriveBob
 * @param {string} leaveBob
 * @return {number}
 */
 var countDaysTogether = function(arriveAlice, leaveAlice, arriveBob, leaveBob) {
    const getMax = (t1, t2) => {
        if(t1[0] > t2[0]) return t1
        else if(t2[0] > t1[0]) return t2
        else {
            if(t1[1] > t2[1]) return t1
            else return t2
        }
    }
    const getMin = (t1, t2) => {
        if(t1[0] > t2[0]) return t2
        else if(t2[0] > t1[0]) return t1
        else {
            if(t1[1] > t2[1]) return t2
            else return t1
        }
    }
    
    const month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    const Atime = []
    const Btime = []
    const aA = arriveAlice.split('-').map(v => parseInt(v))
    const aL = leaveAlice.split('-').map(v => parseInt(v))
    const bA = arriveBob.split('-').map(v => parseInt(v))
    const bL = leaveBob.split('-').map(v => parseInt(v))

    Atime.push(aA, aL)
    Btime.push(bA, bL)
    
    
    const left = getMax(aA, bA)
    const right = getMin(aL, bL)
    
    console.log(left)
    console.log(right);
    
    if(left[0] > right[0]) return 0

    if(left[0] == right[0]) return right[1] - left[1] + 1 > 0 ? right[1] - left[1] + 1 : 0
    
    if(left[0] < right[0]) {
        let rCount = 0
        let lCount = left[1]
        for(let i = right[0] - 1; i >= left[0]; i--) {
            rCount += month[i - 1]
        }
        
        return rCount + right[1] - lCount
    }
    
    
    
};

const res = countDaysTogether("10-01", "10-31", "11-01", "12-31")

console.log(res);

console.log(1 | 0 | 2);