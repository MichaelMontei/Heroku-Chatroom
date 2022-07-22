const express = require('express');
const http = require('http');
let counter = 0;

// Application Express
const app = express();

// ClientPath folder
const clientPath = `${__dirname}/../client`;
app.use(express.static(clientPath));

// Set static folder
const server = http.createServer(app);
let port = process.env.PORT // 3000;

server.listen(port, () =>{
    console.log("server running on "+port);
});

const io = require('socket.io')(server);

// When a client connect

let usernames = [];
io.on('connection', (socket) => {
    counter++;
    console.log('people connected: '+counter); //console log in the server goes to the terminal
    socket.on('sendToAll', (message) =>{ //get message from socket to send to all
        io.emit("displayMessage", (message)); //send back the message to all people connected to the server
    });
    socket.on('sendToMe', (message) =>{ //get message from socket to send back to the same socket
        socket.emit("displayMessage", (message)); //only send back to the original socket
    });
    socket.on('sendToList', (username)=>{ //get username from socket to send back to the same socket
        usernames.push(username) // push username received from client into usernames array
        io.emit("displayList", (usernames)) //return the usernames array to the client
    });
});


