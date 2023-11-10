/**
 * @param {number} capacity
 */

 function listNode(val, pre, next, key) {
    this.val = val
    this.pre = pre
    this.next = next
    this.key = key
}


const map = new Map()
var LRUCache = function(capacity) {
    this.capacity = capacity
    this.size = 0
    this.head = new listNode(0, null, null)
    this.tail = new listNode(0, null, null)
    this.head.next = this.tail
    this.tail.pre = this.head
    
    this.addToHead = function(node) {
        node.pre = this.head
        node.next = this.head.next
        this.head.next.pre = node
        this.head.next = node
        
        // this.head = node
    }

    this.removeNode = function(node) {
        node.pre.next = node.next
        node.next.pre = node.pre
    }

    this.moveToHead = function(node) {
        this.removeNode(node)
        this.addToHead(node)
    }

    this.removeTail = function() {
        const node = this.tail.pre
        this.removeNode(node)
        return node
    }
}

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if(map.has(key)) {
        const node = map.get(key)
        this.moveToHead(node)
        return node.val
    }
    return -1
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if(map.has(key)) {
        const node = map.get(key)
        node.val = value
        this.moveToHead(node)
    } else {
        this.size++
        const node = new listNode(value, null, null, key)
        this.addToHead(node)
        map.set(key, node)
        if(map.size > this.capacity) {
            const node = this.removeTail()
            map.delete(node.key)
            this.size--
        }
    }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */