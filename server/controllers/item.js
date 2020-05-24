const fs = require("fs");
const db = require("../database/db");
const Item = require("../models/item");
const User = require("../models/user");
const { QueryTypes } = require("sequelize");

const collectImgsPath = (files) => {
  const images = {};
  for (let i = 0; i < files.length; i++) {
    images[`img${i}`] = files[i].path;
  }
  return images;
};

const addItem = (req, res) => {
  const { userId, itemName, category, description, imageUrl, price } = req.body;
  const images = collectImgsPath(req.files);
  Item.create({
    item_name: itemName,
    item_description: description.length > 0 ? description : undefined,
    item_category: category,
    item_price: price.length > 0 ? price : undefined,
    item_image_url: imageUrl.length > 0 ? imageUrl : undefined,
    item_images: JSON.stringify(images),
    item_owner: parseInt(userId),
  })
    .then((result) => res.send({ result }))
    .catch((error) => {
      res.status(500).send(`SQL ERROR ${error}`);
      Object.keys(images).forEach((key) => {
        fs.unlink(images[key], (err) => {
          if (err) throw err;
          console.log(images[key] + " was deleted");
        });
      });
    });
};

const getAllItems = (req, res) => {
  Item.findAll()
    .then((result) => res.send(result[0]))
    .catch((error) => res.status(500).send(`SQL ERROR ${error}`));
};

const getItem = (req, res) => {
  const id = req.params.id;
  Item.findOne({ where: { item_id: id } })
    .then((result) => res.send(result[0]))
    .catch((error) => res.status(500).send(`SQL Error ${error}`));
  //TODO add 404 if result []
};

const getItems = (req, res) => {
  Item.findAll({
    order: [["createdAt", "DESC"]],
    include: [{ model: User, as: "ownerRef" }],
  })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err.message);
    });
};

const updateName = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updateItem = await db.sequelize.query(
      `UPDATE items SET item_name = '${name}' WHERE item_id = ${id} AND item_owner = ${req.user.id} RETURNING *`
    );
    if (updateItem[0].length === 0) {
      return res.json("this item is not yours");
    }
    res.json(updateItem[0]);
  } catch (err) {
    console.error(err.message);
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteItem = await db.sequelize.query(
      `DELETE FROM items WHERE item_id = '${id}' RETURNING *`
    );
    res.json(deleteItem[0]);
  } catch (err) {
    console.error(err.message);
  }
};

const searchItem = async (req, res) => {
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
};

const updateOwner = async (req, res) => {
  try {
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
};

const updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { imageUrl } = req.body;
    const updateItem = await db.sequelize.query(
      `UPDATE items SET item_image_url = '${imageUrl}' WHERE item_id = ${id} AND item_owner = ${req.user.id} RETURNING *`
    );
    if (updateItem[0].length === 0) {
      return res.json("this item is not yours");
    }
    res.json(updateItem[0]);
  } catch (err) {
    console.error(err.message);
  }
};

const updatePrice = async (req, res) => {
  try {
    const { id } = req.params;
    const { price } = req.body;
    const updateItem = await db.sequelize.query(
      `UPDATE items SET item_price = '${price}' WHERE item_id = ${id} AND item_owner = ${req.user.id} RETURNING *`
    );
    if (updateItem[0].length === 0) {
      return res.json("this item is not yours");
    }
    res.json(updateItem[0]);
  } catch (err) {
    console.error(err.message);
  }
};

const updateDescription = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateItem = await db.sequelize.query(
      `UPDATE items SET item_description = '${description}' WHERE item_id = ${id} AND item_owner = ${req.user.id} RETURNING *`
    );
    if (updateItem[0].length === 0) {
      return res.json("this item is not yours");
    }
    res.json(updateItem[0]);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  addItem,
  getAllItems,
  getItem,
  getItems,
  updateName,
  deleteItem,
  searchItem,
  updateOwner,
  updateImage,
  updatePrice,
  updateDescription,
};
