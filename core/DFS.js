const utils = require('./utils')
const { Socket } = require('socket.io')

// deep first search implementation 


function DFS(data){

    // data represents a given graph we want to compute the dfs for
    // this function returns an Object that contains all the informations 
    // corresponding to the given data browsed using deep first search

    var visited   = {}

    var newGraph  = {
        name :`${data.name}-DFS`,
        nodes: [],
    }

    // at the begining all the nodes are unvisited
    data.nodes.map(node => {
        visited[""+node.id] = false;
    })

    // reccursion part

    // if a node is not visited yet visit him
    // and do it again for all his neighbors.

    function reccur(node){

        visited[""+node.id] = true

        // we add the data corresponding to the node just visited
        newGraph.nodes.push({
            x:node.x,
            y:node.y,
            value:node.value,
        })

        for(let neighbor of utils.getNeighbors(data , node)){
            if(!visited[""+neighbor.id]){
                reccur(neighbor);
            }
        }
    }


    reccur(data.nodes[0]) //TODO : I can begin anywhere in the graph.
    return newGraph;

}


module.exports = {DFS};