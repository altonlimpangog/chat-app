const express = require('express');
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("Connected to server... ID: " + socket.id);

    socket.on("disconnect", () => {
        console.log("Disconnected from server... ID: " + socket.id);
    })
});

server.listen(4000, () => {         //port
    console.log("Server Running");
});