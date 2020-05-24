const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const db = require("../database/db");
const authorize = require("../middleware/authorize");

const { QueryTypes } = require("sequelize");

const Item = require("../models/item");
const User = require("../models/user");

const itemController = require("../controllers/item");

const jsonParser = bodyParser.json();
const router = express.Router();

fs.mkdir("assets", { recursive: true }, (err) => {
  if (err) throw err;
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// router.get("/", jsonParser, itemController.getAllItems);
// router.get("/find", bodyParser.json(), itemController.findItem);
// router.get("/:id", jsonParser, itemController.getItem);
router.post("/", upload.array("img", 3), itemController.addItem);
// router.delete("/:id", jsonParser, itemController.deleteItem);

router.get("/", jsonParser, itemController.getItems);
// router.get("/", (req, res) => {
//   Item.findAll({
//     include: [{ model: User, as: "ownerRef" }],
//   })
//     .then((user) => {
//       res.json(user);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

router.put("/name/:id", authorize, jsonParser, async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updateItem = await db.sequelize.query(
      `UPDATE items SET item_name = '${name}' WHERE item_id = ${id} AND item_owner = ${req.user.id} RETURNING *`
    );

    console.log(updateItem[0].length);
    if (updateItem[0].length === 0) {
      return res.json("this item is not yours");
    }
    console.log(updateItem[0]);
    res.json(updateItem[0]);
  } catch (err) {
    console.error(err.message);
  }
});

router.put("/description/:id", authorize, jsonParser, async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateItem = await db.sequelize.query(
      `UPDATE items SET item_description = '${description}' WHERE item_id = ${id} AND item_owner = ${req.user.id} RETURNING *`
    );

    console.log(updateItem[0].length);
    if (updateItem[0].length === 0) {
      return res.json("this item is not yours");
    }
    console.log(updateItem[0]);
    res.json(updateItem[0]);
  } catch (err) {
    console.error(err.message);
  }
});

router.put("/price/:id", authorize, jsonParser, async (req, res) => {
  try {
    const { id } = req.params;
    const { price } = req.body;
    const updateItem = await db.sequelize.query(
      `UPDATE items SET item_price = '${price}' WHERE item_id = ${id} AND item_owner = ${req.user.id} RETURNING *`
    );

    console.log(updateItem[0].length);
    if (updateItem[0].length === 0) {
      return res.json("this item is not yours");
    }
    console.log(updateItem[0]);
    res.json(updateItem[0]);
  } catch (err) {
    console.error(err.message);
  }
});

router.put("/image/:id", authorize, jsonParser, async (req, res) => {
  try {
    const { id } = req.params;
    const { imageUrl } = req.body;
    const updateItem = await db.sequelize.query(
      `UPDATE items SET item_image_url = '${imageUrl}' WHERE item_id = ${id} AND item_owner = ${req.user.id} RETURNING *`
    );

    console.log(updateItem[0].length);
    if (updateItem[0].length === 0) {
      return res.json("this item is not yours");
    }
    console.log(updateItem[0]);
    res.json(updateItem[0]);
  } catch (err) {
    console.error(err.message);
  }
});

router.put(
  "/owner/:item_id/:item_owner/:user_id",
  authorize,
  jsonParser,
  async (req, res) => {
    try {
      console.log(req.params);
      const { item_id, item_owner, user_id } = req.params;
      const updateOwner = await db.sequelize.query(
        `UPDATE items SET item_owner = ${user_id} WHERE item_id = ${item_id} AND item_owner = ${item_owner} RETURNING *`
      );
      if (updateOwner[0].length === 0) {
        return res.json("this item is not yours");
      }
      res.json(updateOwner[0]);
    } catch (err) {
      console.error(err.message);
    }
  }
);

router.delete("/:id", jsonParser, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteItem = await db.sequelize.query(
      `DELETE FROM items WHERE item_id = '${id}' RETURNING *`
    );
    res.json(deleteItem[0]);
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/query", jsonParser, async (req, res) => {
  try {
    const { name } = req.query;

    const items = await db.sequelize.query(
      "SELECT * FROM items WHERE item_name || ' ' || item_description || ' ' || item_category ILIKE ?",
      {
        replacements: [`%${name}%`],
        type: QueryTypes.SELECT,
      }
    );
    res.json(items);
  } catch (err) {
    console.error(err.message);
  }
});
module.exports = router;
