const User = require('../models/user');
const { sequelize } = require('../database/db');

const getAllUsers = (req, res ) => {
    const sql = 'SELECT * FROM users';
    return sequelize.query(sql)
        .then(result => res.send(result[0]))
        .catch(error => res.send(error));
}

const findUser = (req, res) => {
    const { name } = req.query;
    return sequelize.query(`SELECT * FROM users WHERE user_name || ' ' || user_surname ILIKE '%${name}%'`)
        .then(result => res.send(result[0]))
        .catch(error => res.send(error));

}

module.exports = {getAllUsers, findUser};

