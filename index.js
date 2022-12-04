const express = require('express');
const app = express();
require ("dotenv").config()

const http = require('http');
const { Server } = require('socket.io');

const cors = require('cors');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        //origin: "http://localhost:3000",
        methods: ["GET","POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`)

    /*socket.on("send_message",(data)=>{
        console.log(data);
        socket.broadcast.emit("receive_message", data);
    });*/

    socket.on("create_room",(data)=>{
        socket.join(data);
        console.log("Joined ", {data})
    });

    socket.on("join_room",(data)=>{
        socket.join(data);
    });

    socket.on("send_message", (data) => {
        
        socket.to(data.room).emit("receive_message", data);
    });



})



server.listen(process.env.PORT || 5000, ()=>{
    console.log("Connected")
});