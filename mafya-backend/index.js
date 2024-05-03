const { Server } = require("sm-express-server");
const { Server: SocketIo } = require("socket.io");
const path = require("path");
const bodyParser = require("body-parser");
const controllers = require("./endpoints");
const Room = require("./modules/Room");
const User = require("./modules/User");
require("dotenv").config();

const port = process.env.PORT || 4000;

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

/**
 * @type {{userId: string, clientId: string, roomId: any}[]}
 */
const users = [];

io.on("connection", (client) => {
    console.log(`new connected (${client.id})`);

    client.emit("getRooms");

    client.on("login", (user) => {
        const findUser = users.find(u => u.userId == user.id);
        if (findUser) {
            findUser.clientId = client.id;
            client.emit("login", findUser.userId);
        } else
            client.emit("login", null);
    })

    client.on("signup", () => {
        let newId = "";

        while (newId === "" || users.find(u => u.userId === newId)) {
            newId = "mf-us-" + Math.floor(Math.random() * 1000);
        }
     
        users.push({userId: newId, clientId: client.id, roomId: null});
        client.emit("signup", newId);
    })

    client.on("createRoom", (room) => {
        Room.addRoom(room.name, client.id).then(res => {
            client.broadcast.emit("getRooms");
            client.emit("createRoom", {...room, id: res.insertId});
        }).catch(err => {
            
        });

    })

    client.on("getRoomData", (roomId, user) => {
        const findUser = users.find(u => u.userId === user.id);
        if (findUser)
            findUser.roomId = roomId;
        io.emit(`getRoomData_${roomId}`, user);
    })

    client.on("sendCurrentRoom", (room) => {
        io.emit("sendCurrentRoom", room);
    })

    client.on("update", (roomId, update, updateValue) => {
        client.broadcast.emit(`update_${roomId}`, update, updateValue);
    })

    client.on("disconnect", () => {
        const findUser = users.find(u => u.clientId === client.id);
        if (findUser && findUser.roomId) {
            io.on(`update_${findUser.roomId}`, `this.setUserIsOnline("${findUser.userId}", false)`);
        }
        console.log(`new disconnected (${client.id})`);
        Room.deleteRoomByUserId(client.id).then(() => {
            client.broadcast.emit("getRooms");
        }).catch(err => {
            client.broadcast.emit("getRooms");
        })
        io.emit("userLogout", client.id);

    });
})