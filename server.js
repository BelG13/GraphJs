const DFS     = require('./core/DFS')
const BFS     = require('./core/BFS')
const express = require('express')
const app     = express()
const PORT    = 3000

var server = app.listen(PORT , '127.0.0.1' , () => {
    console.log("server is listening on port "+PORT);
})

app.use(express.static('public'));


var socket = require('socket.io');

var io     = socket(server, {
  cors: {
    origin     : '*',
    methods    : ["GET", "POST"],
    credentials: true,
  },
}); 



// server function


// connection
io.sockets.on('connection' , (socket) => {
    console.log("connexion from : "+socket.id);

    // if the server recive a 'dfs' message then 
    // he compute the deep first search from the given graph
    // and emit the result.

    socket.on('dfs' , (data) => {
      socket.emit('dfs' , DFS.DFS(data))
  })

  

    // if the server recive a 'bfs' message then 
    // he compute the breadth first search from the given graph
    // and emit the result.


    socket.on('bfs' , (data) => {
      socket.emit('bfs' , BFS.BFS(data))
    })

})


