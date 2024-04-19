const errors = require("../errors");
const UploadFileRequest = require("./UploadFileRequest")
const UploadFileResponse = require("./UploadFileResponse")
const fs= require("fs")

/**
 * 
 * @param {UploadFileRequest} request 
 * @returns {Promise<UploadFileResponse>}
 */
const uploadFileService = (request) => {
    const {fileName, roomId} = request;
    const newFileName = roomId + "." + fileName.split(".")[fileName.split(".").length - 1];
    return new Promise((resolve) => {
        fs.rename("./assets/" + fileName, "./assets/" + request.fileName, (err) => {
            if (!err)
                return resolve(new UploadFileResponse("/assets/" + request.fileName));
            return resolve(new UploadFileResponse(null, errors.RENAME_FILE_ERROR));
        })
    })
}

module.exports = uploadFileService;