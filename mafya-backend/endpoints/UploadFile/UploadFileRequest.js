
class UploadFileRequest {
    /**
     * 
     * @param {string} fileName 
     * @param {string} roomId 
     */
    constructor(fileName, roomId) {
        this.fileName = fileName;
        this.roomId = roomId;
    }
}

module.exports = UploadFileRequest;