const { Server } = require("sm-express-server");
const { Server: SocketIo } = require("socket.io");
const bodyParser = require("body-parser");
const controllers = require("./endpoints");
const Room = require("./modules/Room");

const port = process.env.PORT || 5454;

const server = new Server(port, "/", [bodyParser.json()]);
server.addControllers(controllers);

const io = new SocketIo(server.server, { cors: { origin: "*" } });

server.start(() => {
    console.log(`server is up on port ${port}!`);
})

server.app.get("/", (req, res) => {
    res.send(`server is up on port ${port}!`);
})

const rooms = [];

io.on("connection", (client) => {
    console.log(`new connected (${client.id})`);

    client.emit("getRooms");

    client.on("createRoom", (room) => {
        Room.addRoom(room.name, client.id).then(res => {
            client.broadcast.emit("getRooms");
            client.emit("createRoom", {...room, id: res.insertId});
        });
    })
    
    client.on("logout", (id) => {
        console.log(id);
    })
    client.on("disconnect", () => {
        console.log(`new disconnected (${client.id})`);
        Room.deleteRoomByUserId(client.id).then(res => {
            client.broadcast.emit("getRooms");
        })
    });
})