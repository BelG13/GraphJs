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
})

//color