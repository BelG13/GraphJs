function getNeighbors(graph , node){

    // return all the neighbors for a given node node

    var neighbors  = [];

    for(let v of graph.vertexes){

        if(node.id === v.nodeA.id){
            neighbors.push(v.nodeB)
        }

        else if (node.id === v.nodeB.id){
            neighbors.push(v.nodeA)
        }

    }

    return neighbors;
}


module.exports = {getNeighbors}