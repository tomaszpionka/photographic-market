const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require("../database/db");
const { QueryTypes } = require("sequelize");
const Order = require("../models/order");
const authorize = require("../middleware/authorize");

router.get("/", bodyParser.json(), async (req, res) => {
  try {
    const orders = await db.sequelize.query(`SELECT * FROM orders`, {
      type: QueryTypes.SELECT,
    });
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
      const { item_id, item_owner, item_buyer } = req.params;
      const order = await db.sequelize.query(
        `SELECT * FROM orders WHERE item_id = '${item_id}' AND item_buyer = '${item_buyer}'`,
        {
          type: QueryTypes.SELECT,
        }
      );
      if (order.length > 0) {
        return res.status(401).json("order already exist!");
      }
      Order.create({
        item_id: item_id,
        item_owner: item_owner,
        item_buyer: item_buyer,
        order_init: true,
      })
        .then((result) => {
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

router.put(
  "/offer/:order_id/:item_id/:process",
  authorize,
  bodyParser.json(),
  async (req, res) => {
    try {
      const { order_id, item_id, process } = req.params;
      if (process === "true") {
        const offer = await db.sequelize.query(
          `SELECT * from orders WHERE item_id = '${item_id}' and order_process = 'true'`,
          {
            type: QueryTypes.SELECT,
          }
        );
        if (offer.length > 0) {
          return res.status(401).json("offer already confirmed");
        } else {
          const updateOffer = await db.sequelize.query(
            `UPDATE orders SET order_process = '${process}' WHERE order_id = '${order_id}' RETURNING *`
          );

          if (updateOffer[0].length === 0) {
            return res.json("this offer is not yours");
          }
          res.json(updateOffer[0]);
        }
      } else {
        const updateOffer = await db.sequelize.query(
          `UPDATE orders SET order_process = '${process}' WHERE order_id = '${order_id}' RETURNING *`
        );
        if (updateOffer[0].length === 0) {
          return res.json("this offer is not yours");
        }
        res.json(updateOffer[0]);
      }
    } catch (err) {
      console.error(err.message);
    }
  }
);

router.put(
  "/confirm/:order_id",
  authorize,
  bodyParser.json(),
  async (req, res) => {
    try {
      const { order_id } = req.params;
      const confirmOrder = await db.sequelize.query(
        `UPDATE orders SET order_success = 'true' WHERE order_id = '${order_id}' RETURNING *`
      );
      res.json(confirmOrder[0]);
    } catch (err) {
      console.error(err.message);
    }
  }
);

module.exports = router;
