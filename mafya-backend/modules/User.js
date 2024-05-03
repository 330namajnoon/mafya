const errors = require("../endpoints/errors");
const connection = require("../endpoints/mysqlConnection");

class User {
    
    /**
     * 
     * @param {number} id 
     * @param {string} clientId 
     * @param {string} roomId 
     */
    constructor(id, clientId, roomId) {
        this.id = id;
        this.clientId = clientId;
        this.roomId = roomId;
    }

    getId() {
        return this.id;
    }

    getClientId() {
        return this.clientId;
    }

    getRoomId() {
        return this.roomId;
    }

    /**
     * @returns {Promise<User[]>}
     */
    static getUsers() {
        return new Promise((resolve, reject) => {
            const getUsersQuery = `
                SELECT * FROM users;
            `;
    
            connection.query(getUsersQuery, (err, users) => {
                if (err)
                    return reject(errors.MYSQL_QUERY_ERROR);
                return resolve(users);
            })
        })
    }

    /**
     * @param {number} userId
     * @returns {Promise<User[]>}
     */
    static getUsersById(userId) {
        return new Promise((resolve, reject) => {
            const getUsersByIdQuery = `
                SELECT * FROM users where id = '${userId}';
            `;
    
            connection.query(getUsersByIdQuery, (err, users) => {
                if (err)
                    return reject(errors.MYSQL_QUERY_ERROR);
                return resolve(users);
            })
        })
    }

    /**
     * 
     * @param {User} user 
     * @returns {Promise<any>}
     */
    static addUser(user) {
        return new Promise((resolve, reject) => {
            const addUserQuery = `
                INSERT INTO users (clientId, roomId) VALUES (?, ?);
            `;

            connection.query(addUserQuery, [user.clientId, user.roomId], (err, res) => {
                if (err)
                    return reject(errors.MYSQL_QUERY_ERROR);
                return resolve(res);
            })
        })
    }
}

module.exports = User;