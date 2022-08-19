const utils = require('./utils')


function BFS(data){
    /** 
    * Apply the breadth first search algorithm to data
    * @param {Object} data - has two attributes , graph and root. graph represents the given graph and root represent the first node.
    * @return {Object} an object that contains the nodes and the vertexes of the graph given in data after using bfs algorithm.
    */

    var {graph , root} = data
    var visited        = {}

    graph.nodes.map(x => {
        visited[""+x.id] = false;
    })

    visited[""+root.id] = true


    var queue    = [root]

    var newGraph = {
        name : `${graph.name}-BFS-${root.id}`,
        nodes : [{value:0 , x:root.x , y:root.y}],
        vertexes : graph.vertexes,
    }

    var distance = -1; // the distance between the root node.


    function algo(){

        while(queue.length != 0){

            distance++;
            var node = queue.splice(0,1)[0]
            
            // TODO fiding path

            for(let neighbor of utils.getNeighbors(graph , node)){

                if(!visited[""+neighbor.id]){

                    queue.push(neighbor)
                    visited[""+neighbor.id] = true

                    newGraph.nodes.push({
                        value:distance, //the value is the distance.
                        x:neighbor.x,
                        y:neighbor.y,
                    })

                }
            }

        }
    }

    algo()
    return newGraph
}


module.exports = {BFS}