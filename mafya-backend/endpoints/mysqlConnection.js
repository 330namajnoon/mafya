const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "bella",
    database: "mafya",
    password: "bellamysql"
});

module.exports = connection;