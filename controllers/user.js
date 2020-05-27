const User = require("../models/user");
const db = require("../database/db");
const { sequelize } = require("../database/db");

const getAllUsers = (req, res) => {
  return User.findAll()
    .then((result) => res.send(result[0]))
    .catch((error) => res.send(error));
};

const findUser = (req, res) => {
  const { name } = req.query;
  return sequelize
    .query(
      `SELECT * FROM users WHERE user_name || ' ' || user_surname || ' ' || user_id ILIKE '%${name}%'`
    )
    .then((result) => {
      res.json(result);
    })
    .catch((error) => res.send(error));
};

const updateName = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updateUser = await db.sequelize.query(
      `UPDATE users SET user_name = '${name}' WHERE user_id = ${id} RETURNING *`
    );
    if (updateUser[0].length === 0) {
      return res.json("this user is not yours");
    }
    res.json(updateUser[0]);
  } catch (err) {
    console.error(err.message);
  }
};

const updateSurname = async (req, res) => {
  try {
    const { id } = req.params;
    const { surname } = req.body;
    const updateUser = await db.sequelize.query(
      `UPDATE users SET user_surname = '${surname}' WHERE user_id = ${id} RETURNING *`
    );
    if (updateUser[0].length === 0) {
      return res.json("this user is not yours");
    }
    res.json(updateUser[0]);
  } catch (err) {
    console.error(err.message);
  }
};

const updatePhone = async (req, res) => {
  try {
    const { id } = req.params;
    const { phone } = req.body;
    const updateUser = await db.sequelize.query(
      `UPDATE users SET user_phone = '${phone}' WHERE user_id = ${id} RETURNING *`
    );
    if (updateUser[0].length === 0) {
      return res.json("this user is not yours");
    }
    res.json(updateUser[0]);
  } catch (err) {
    console.error(err.message);
  }
};

const updateCity = async (req, res) => {
  try {
    const { id } = req.params;
    const { city } = req.body;
    const updateUser = await db.sequelize.query(
      `UPDATE users SET user_city = '${city}' WHERE user_id = ${id} RETURNING *`
    );
    if (updateUser[0].length === 0) {
      return res.json("this user is not yours");
    }
    res.json(updateUser[0]);
  } catch (err) {
    console.error(err.message);
  }
};

const updateImageUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const { imageUrl } = req.body;
    const updateUser = await db.sequelize.query(
      `UPDATE users SET user_image = '${imageUrl}' WHERE user_id = ${id} RETURNING *`
    );
    if (updateUser[0].length === 0) {
      return res.json("this user is not yours");
    }
    res.json(updateUser[0]);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  getAllUsers,
  findUser,
  updateName,
  updateSurname,
  updatePhone,
  updateCity,
  updateImageUrl,
};
