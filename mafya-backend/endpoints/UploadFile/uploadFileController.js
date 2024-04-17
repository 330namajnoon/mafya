const { Controller, storage } = require("sm-express-server");
const path = require("path");
const UploadFileResponse = require("./UploadFileResponse");

const propertise = {
    method: "POST",
    path: "/uploadFile",
    name: "Upload file",
    storage: storage(path.join(__dirname, "./")).single("file")
}

const uploadFileController = new Controller(propertise, (req, res, app) => {
    console.log(req.file)
    res.send(new UploadFileResponse(req.file.originalname, 200));
})

module.exports = uploadFileController;