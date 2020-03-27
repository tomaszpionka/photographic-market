const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../database/db");
const { QueryTypes } = require("sequelize");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");

router.post("/register", validInfo, async (req, res) => {
  const { email, name, surname, password } = req.body;

  try {
    const user = await db.sequelize.query(
      `SELECT * FROM users WHERE user_email = '${email}'`,
      {
        type: QueryTypes.SELECT
      }
    );

    if (user.lenght > 0) {
      return res.status(401).json("user already exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = await db.sequelize.query(
      `INSERT INTO users (user_name, user_surname, user_email, user_password) VALUES ('${name}','${surname}','${email}','${bcryptPassword}') RETURNING *`,
      {
        type: QueryTypes.SELECT
      }
    );

    const jwtToken = jwtGenerator(newUser[0].user_id);

    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.post("/login", validInfo, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.sequelize.query(
      `SELECT * FROM users WHERE user_email = '${email}'`,
      {
        type: QueryTypes.SELECT
      }
    );

    if (user.length == 0) {
      return res.status(401).json("invalid credential");
    }

    const validPassword = await bcrypt.compare(password, user[0].user_password);

    if (!validPassword) {
      return res.status(401).json("invalid credential");
    }
    const jwtToken = jwtGenerator(user[0].user_id);
    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
