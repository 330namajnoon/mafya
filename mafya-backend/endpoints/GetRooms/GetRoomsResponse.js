const Room = require("../../modules/Room");
const GenericResponse = require("../GenericResponse");

class GetRoomsResponse extends GenericResponse {

    /**
     *
     * @param {Room[] | null} rooms
     * @param {number} status
     */
    constructor(rooms, status = 200) {
        super(status);
        this.rooms = rooms;
    }
}

module.exports = GetRoomsResponse;