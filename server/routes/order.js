const express = require("express");
const router = express.Router();
// const userController = require("../controllers/user");
const bodyParser = require("body-parser");
const db = require("../database/db");
const { QueryTypes } = require("sequelize");
const Order = require("../models/order");

router.get("/", bodyParser.json(), async (req, res) => {
  try {
    const orders = await db.sequelize.query(`SELECT * FROM orders`, {
      type: QueryTypes.SELECT,
    });
    console.log(orders);
    res.json(orders);
  } catch (error) {
    console.error(error.message);
  }
});

router.post(
  "/:item_id/:item_owner/:item_buyer",
  bodyParser.json(),
  async (req, res) => {
    try {
      console.log(req.params);
      const { item_id, item_owner, item_buyer } = req.params;
      Order.create({
        item_id: item_id,
        item_owner: item_owner,
        item_buyer: item_buyer,
      })
        .then((result) => {
          console.log(result);
          res.send({ result });
        })
        .catch((error) => {
          res.status(500).send(`SQL ERROR ${error}`);
        });
    } catch (error) {
      console.error(error.message);
    }
  }
);
module.exports = router;
