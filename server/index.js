const http = require('http');
const express = require('express');
const cors = require('cors');
const socketIO = require('socket.io');

const app = express();
app.use(cors());
const port = process.env.PORT || 4500
const server = http.createServer(app);
const users = {};
app.get('/', (req, res) => {
    res.send("Hlo");
})
const io = socketIO(server);
io.on("connection", (socket) => {
    console.log("new connection");
    socket.on('joined', ({ username }) => {
        users[socket.id] = username;
        console.log(`${username}  joined the chat `);
        socket.broadcast.emit('userJoined', { user: "Admin", message: `${users[socket.id]} joined the chat` });
        socket.emit('welcome', { user: "Admin", message: ` Welcome to the chat ${users[socket.id]}` })
    });

    // socket.on('userDisconnect', () => {
    //     // Handle user disconnection here
    //     console.log(`${users[socket.id]} disconnected`);
    //     socket.broadcast.emit('userLeft', { user: "Admin", message: `${users[socket.id]} left the chat` });
    //     delete users[socket.id]; // Remove user data
    // });


    // socket.on('disconnect', () => {
    //     // Handle general disconnections here (e.g., client closes the connection)
    //     if (users[socket.id]) {
    //         console.log(`${users[socket.id]} disconnected`);
    //         socket.broadcast.emit('userLeft', { user: "Admin", message: `${users[socket.id]} left the chat` });
    //         delete users[socket.id]; // Remove user data
    //     }
    // });
    socket.on('disconnect', () => {
        socket.broadcast.emit('leave', { user: "Admin", message: `${users[socket.id]} leave the chat ` })
        console.log("log out")
        delete users[socket.id];
    })
    socket.on('message', ({ message, id }) => {
        io.emit('sendMessage', { user: users[id], message, id })
    })
    // socket.on('welcome', (data) => {
    //     console.log(data);
    // })
})
server.listen(port, () => {
    console.log("Server is running ");
})