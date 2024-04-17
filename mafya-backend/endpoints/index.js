const getRoomsController = require("./GetRooms/getRoomsController");
const uploadFileController = require("./UploadFile/uploadFileController");

const controllers = [
    getRoomsController,
    uploadFileController
]

module.exports = controllers;