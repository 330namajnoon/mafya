const { Controller, storage } = require("sm-express-server");
const getRoomsService = require("./getRoomsService");

const propertise = {
    name: "Get rooms",
    path: "/rooms",
    method: "GET",
    storage: storage("./").none()
}

const getRoomsController = new Controller(propertise, (req, res, app) => {
    getRoomsService().then(response => {
        res.status(response.status).send(response);
    })
})

module.exports = getRoomsController;