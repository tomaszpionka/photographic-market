const User = require('../models/user');
const { sequelize } = require('../database/db');

const getAllUsers = (req, res ) => {
    const sql = `SELECT * FROM users`;
    return sequelize.query(sql)
        .then(result => res.send(result[0]))
        .catch(error => res.status(500).send(error));
}

module.exports = {getAllUsers};

