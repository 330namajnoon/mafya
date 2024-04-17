const { Server } = require("sm-express-server");
const { Server: SocketIo } = require("socket.io");
const path = require("path");
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

server.app.get("/mafya-client", (req, res) => {
    res.sendFile(path.join(__dirname, "./dist/"), "index.html")
})

io.on("connection", (client) => {
    console.log(`new connected (${client.id})`);

    client.emit("getRooms");

    client.on("login", () => {
        client.emit("login", client.id);
    })

    client.on("createRoom", (room) => {
        Room.addRoom(room.name, client.id).then(res => {
            client.broadcast.emit("getRooms");
            client.emit("createRoom", {...room, id: res.insertId});
        });

    })

    client.on("getRoomData", (roomId, user) => {
        io.emit(`getRoomData_${roomId}`, user);
    })

    client.on("sendCurrentRoom", (room) => {
        io.emit("sendCurrentRoom", room);
    })

    client.on("update", (roomId, update, updateValue) => {
        client.broadcast.emit(`update_${roomId}`, update, updateValue);
    })
    client.on("disconnect", () => {
        console.log(`new disconnected (${client.id})`);
        Room.deleteRoomByUserId(client.id).then(() => {
            client.broadcast.emit("getRooms");
        })
        io.emit("userLogout", client.id);
    });
})