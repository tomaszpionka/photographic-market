const router = require("express").Router();
const authorize = require("../middleware/authorize");
const db = require("../database/db");
const { QueryTypes } = require("sequelize");
const Item = require("../models/item");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

router.get("/", authorize, async (req, res) => {
  try {
    // const user = await pool.query(
    //   "SELECT user_name FROM users WHERE user_id = $1",
    //   [req.user.id]
    // );
    // u.user_name, i.item_id, i.item_description
    const user = await db.sequelize.query(
      `SELECT * FROM users AS u LEFT JOIN items AS i ON u.user_id = i.item_owner WHERE u.user_id = '${req.user.id}'`,
      {
        type: QueryTypes.SELECT,
      }
    );
    // console.log(user);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// router.get("/", authorize, async (req, res) => {
//   try {
//     const user = await db.sequelize.query(
//       `SELECT user_name, user_id FROM users WHERE user_id = '${req.user.id}'`,
//       {
//         type: QueryTypes.SELECT,
//       }
//     );
//     console.log("test");
//     console.log(user[0]);
//     res.json(user[0]);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

router.get("/items", authorize, (req, res) => {
  Item.findAll()
    .then((allItems) => {
      console.log(allItems);
      res.json(allItems);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
