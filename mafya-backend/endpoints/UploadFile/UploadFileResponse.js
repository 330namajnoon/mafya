const GenericResponse = require("../GenericResponse");

class UploadFileResponse extends GenericResponse {

    /**
     *
     * @param {string | null} filePath
     * @param {number} status
     */
    constructor(filePath, status = 200) {
        super(status);
        this.filePath = filePath;
    }
}

module.exports = UploadFileResponse;