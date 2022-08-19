

// dfs button
document.getElementById('dfs').addEventListener('click' , () => {
    var graph = getGraphByName(document.getElementById('dfs-input').value)

    if(graph == null || graph.nodes.length == 0) return;

    try{
        var root = graph.nodes[parseInt(document.getElementById('dfs-input-root').value)] || graph.nodes[0]

    }
    catch(error){
        console.log(error);
    }


    try {

        socket.emit('dfs' , {
            graph:graph,
            root:root,
        })

    } catch (error) {
        console.log(error);
    }
})


//bfs button 
document.getElementById('bfs').addEventListener('click' , () => {

    var graph = getGraphByName(document.getElementById('bfs-input').value)

    if(graph == null || graph.nodes.length == 0) return;

    try{
        var root = graph.nodes[parseInt(document.getElementById('bfs-input-root').value)] || graph.nodes[0]
    }
    catch(error){
        console.log(error);
    }

    try{
        socket.emit('bfs' , {
            graph:graph,
            root:root,
        })
    }
    catch(error){
        console.log(error);
    }
})


// etc 


