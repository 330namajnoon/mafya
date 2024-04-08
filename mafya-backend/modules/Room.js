const errors = require("../endpoints/errors");
const connection = require("../endpoints/mysqlConnection");

class Room {

    /**
     * 
     * @param {number} id
     * @param {string} name
     */
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    /**
     * 
     * @returns {Promise<Room[]>}
     */
    static getRooms() {
        return new Promise((resolve, reject) => {
            const getRoomsQuery = `
                SELECT * FROM rooms
            `;

            connection.query(getRoomsQuery, (err, rooms) => {
                if (err)
                    return reject(errors.MYSQL_QUERY_ERROR);
                return resolve(rooms);
            })
        })
    }

    /**
     * 
     * @param {string} name
     * @returns {Promise<any>}
     */
    static addRoom(name) {
        return new Promise((resolve, reject) => {
            const addRoomQuery = `
                INSERT INTO rooms (name) VALUES (?);
            `;

            connection.query(addRoomQuery, [name], (err, results) => {
                if (err)
                    return reject(errors.MYSQL_QUERY_ERROR);
                return resolve(results);
            })
        })
    }
}

module.exports = Room;