/**
 * @param {number[]} players
 * @param {number[]} trainers
 * @return {number}
 */
 var matchPlayersAndTrainers = function(players, trainers) {
    const swap = (array, i, j) => {
            // [array[i], array[j]] = [array[j], array[i]]
        const t = array[i]
        array[i] = array[j]
        array[j] = t
        }

    const maxHeapify = (nums, index, len) => {
        let left = index * 2 + 1, right = index * 2 + 2
        let max = index
        if(left < len && nums[max] < nums[left]) {
            max = left
        }
        if(right < len && nums[max] < nums[right]) {
            max = right
        }
        if(max != index) {
            swap(nums, max, index)
            maxHeapify(nums, max, len)
        }
    }

    const buildMaxHeap = (nums, len) => {
        const first = (len / 2) | 0
        for(let i = first; i >= 0; i--) {
            maxHeapify(nums, i, len)
        }
    }
    
   
    let ans = 0
    const plen = players.length
    const tlen = trainers.length
    buildMaxHeap(players, plen)
    buildMaxHeap(trainers, tlen)
    // return players[0]
    console.log(players);
    console.log(trainers);
    for(let i = 0; i < plen && ans < tlen; i++) {
        console.log(players);
        console.log(trainers);
        if(players[0] <= trainers[0]) {
            ans++
            // swap(players, 0, plen - 1)
            // swap(trainers, 0, tlen - 1)
            players.shift()
            trainers.shift()
            maxHeapify(players, 0, plen)
            maxHeapify(trainers, 0, tlen)
        } else{
            // swap(players, 0, plen - 1)
            players.shift()
            maxHeapify(players, 0, plen)
        } 
    }
    
    return ans

};

const res = matchPlayersAndTrainers([4,7,9],[8,2,5,8])

console.log(res);

console.log()