const User = require("../models/user");
const { sequelize, Sequelize } = require("../database/db");
const Op = Sequelize.Op;

const getAllUsers = (req, res) => {
  return User.findAll()
    .then((result) => res.send(result[0]))
    .catch((error) => res.send(error));
};

const findUser = (req, res) => {
  const { name } = req.query;
  //   return sequelize
  //     .query(
  //       `SELECT * FROM users WHERE user_name || ' ' || user_surname ILIKE '%${name}%'`
  //     )
  return User.findOne({ where: { user_name: { [Op.like]: `%${name}%` } } })
    .then((result) => res.send(result[0]))
    .catch((error) => res.send(error));
};

module.exports = { getAllUsers, findUser };
