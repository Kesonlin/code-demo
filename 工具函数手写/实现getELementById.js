function getELementById(rootNode, id) {
    if (!rootNode) return null
    if (rootNode.id == id) return rootNode
    for (let node of rootNode.childNodes) {
        const found = getELementById(node, id)
        if (found) return node
    }

    return null
}