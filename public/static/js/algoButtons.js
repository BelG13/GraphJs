

// dfs btton
document.getElementById('dfs').addEventListener('click' , () => {
    var data = getGraphByName(document.getElementById('dfs-input').value)
    try {
        socket.emit('dfs' , data)
    } catch (error) {
        console.log(error);
    }
})


//bfs button 



// etc 


