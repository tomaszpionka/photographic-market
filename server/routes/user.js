const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const bodyParser = require("body-parser");
const db = require("../database/db");
const { QueryTypes } = require("sequelize");

router.get("/", bodyParser.json(), userController.getAllUsers);
router.get("/find", bodyParser.json(), userController.findUser);
router.get("/query", bodyParser.json(), async (req, res) => {
  try {
    const { name } = req.query;
    const id = parseInt(name);

    const items = await db.sequelize.query(
      `SELECT * FROM users WHERE user_id = ${id}`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.json(items);
  } catch (err) {
    console.error(err.message);
  }
});
module.exports = router;
