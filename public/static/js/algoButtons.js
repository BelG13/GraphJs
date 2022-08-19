

// dfs button
document.getElementById('dfs').addEventListener('click' , () => {
    var graph = getGraphByName(document.getElementById('dfs-input').value)

    try{
        var root = graph.nodes[parseInt(document.getElementById('dfs-input-root').value)]
    }
    catch(error){
        console.log(error);
        var root = graph.nodes[0]
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

    try{
        var root = graph.nodes[parseInt(document.getElementById('bfs-input-root').value)]
    }
    catch(error){
        console.log(error);
        var root = graph.nodes[0]
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


