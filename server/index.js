const { Server } = require("sm-express-server");
const path = require("path");
const express = require("express");

const port = process.env.PORT || 4005;

const server = new Server(port, "/", []);

server.app.use("/", express.static(path.join(__dirname, "./dist/")));
server.app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist', 'index.html'));
});

server.start(() => {
    console.log(`Server is up on port ${port}!`);
})