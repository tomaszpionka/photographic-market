const Sequelize = require('sequelize');
const connection = require('../config');

const db = {}

const sequelize = new Sequelize(connection.database, connection.username, connection.password, {
    dialect: connection.dialect,
    host: connection.host,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db;
