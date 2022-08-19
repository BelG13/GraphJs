const utils = require('./utils')
const { Socket } = require('socket.io')

// deep first search implementation 


function DFS(data){

    /**
     * use the deep first search algorithm on the grave given in data
     * @param {Object} data - {graph , root}
     * @return {object} - contains all the nodes in the order they appered in the dfs.
     */

    var {graph , root} = data
    var visited   = {}

    var newGraph  = {
        name :`${graph.name}-DFS-${root.id}`,
        nodes: [],
    }

    // at the begining all the nodes are unvisited
    graph.nodes.map(node => {
        visited[""+node.id] = false;
    })

    // reccursion part

    // if a node is not visited yet visit him
    // and do it again for all his neighbors.

    function reccur(node){

        visited[""+node.id] = true

        // we add the node corresponding to the node just visited
        newGraph.nodes.push({
            x:node.x,
            y:node.y,
            value:node.value,
        })

        for(let neighbor of utils.getNeighbors(graph , node)){
            if(!visited[""+neighbor.id]){
                reccur(neighbor);
            }
        }
    }


    reccur(root)
    return newGraph;

}


module.exports = {DFS};