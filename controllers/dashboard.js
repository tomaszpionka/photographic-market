const db = require("../database/db");
const { QueryTypes } = require("sequelize");
const Item = require("../models/item");

const getUsers = async (req, res) => {
  try {
    const user = await db.sequelize.query(
      `SELECT * FROM users AS u LEFT JOIN items AS i ON u.user_id = i.item_owner WHERE u.user_id = '${req.user.id}'`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getItems = (req, res) => {
  Item.findAll()
    .then((allItems) => {
      res.json(allItems);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = { getUsers, getItems };
