const Room = require("../../modules/Room");
const GetRoomsResponse = require("./GetRoomsResponse");

/**
 * 
 * @returns {Promise<GetRoomsResponse>}
 */
const getRoomsService = () => {
    return new Promise((resolve, reject) => {
        Room.getRooms().then(rooms => {
            resolve(new GetRoomsResponse(rooms));
        })
        .catch(err => {
            resolve(new GetRoomsResponse(null, err));
        })
    })
}

module.exports = getRoomsService;