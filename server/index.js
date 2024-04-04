const { Server } = require("sm-express-server");
const path = require("path");

const port = process.env.PORT || 4005;

const server = new Server(port, "/dist/", []);

server.start(() => {
    console.log(`Server is up on port ${port}!`);
})