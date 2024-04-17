const { Controller, storage } = require("sm-express-server");
const path = require("path");
const multer = require("multer");
const UploadFileResponse = require("./UploadFileResponse");
const uploadFileService = require("./uploadFileService");
const UploadFileRequest = require("./UploadFileRequest");

const upload = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, "./assets");
    },
    filename: (req, file, cd) => {
        cd(null, file.originalname);
    }
})

const propertise = {
    method: "POST",
    path: "/uploadFile",
    name: "Upload file",
    storage: multer({storage: upload}).single("file")
}

const uploadFileController = new Controller(propertise, (req, res, app) => {
    uploadFileService(new UploadFileRequest(req.file.originalname, req.body.roomId)).then(response => {
        res.status(response.status).send(response);
    })
})

module.exports = uploadFileController;