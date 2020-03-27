const router = require("express").Router();
const authorize = require("../middleware/authorize");
const db = require("../database/db");
const { QueryTypes } = require("sequelize");

router.get("/", authorize, async (req, res) => {
  try {
    const user = await db.sequelize.query(
      `SELECT user_name, user_id FROM users WHERE user_id = '${req.user.id}'`,
      {
        type: QueryTypes.SELECT
      }
    );
    console.log(user[0]);
    res.json(user[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
