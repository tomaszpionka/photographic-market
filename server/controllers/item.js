const fs = require("fs");
const { sequelize, Sequelize } = require("../database/db");
const Item = require("../models/item");
const Op = Sequelize.Op;

const collectImgsPath = (files) => {
  const images = {};
  for (let i = 0; i < files.length; i++) {
    images[`img${i}`] = files[i].path;
  }

  return images;
};

const addItem = (req, res) => {
  const { userId, itemName, category, description } = req.body;
  const images = collectImgsPath(req.files);
  Item.create({
    item_name: itemName,
    item_description: description,
    item_category: category,
    item_price: 1,
    item_imageUrl: "default",
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

const removeImg = (result) => {
  const img = result[0].images_json;
  const imgKeys = Object.keys(img);
  console.log(imgKeys);
  imgKeys.forEach((key) => {
    fs.unlink(img[key], (err) => {
      if (err) throw err;
      console.log(img[key] + " was deleted");
    });
  });
};
const deleteItem = (req, res) => {
  const id = req.params.id;
  Item.findOne({ where: { item_id: id } })
    .then((item) => {
      return item.destroy();
    })
    .then((result) => {
      res.send(result);
      removeImg(result);
    })
    .catch((err) => console.log(err));
};

const findItem = (req, res) => {
  const { name, category } = req.query;
  let sql = "";
  if (category === "all") {
    name !== undefined
      ? (sql = Item.findAll({
          where: { item_name: { [Op.like]: `%${name}%` } },
        }))
      : (sql = Item.findAll());
  } else {
    name !== undefined
      ? (sql = Item.findAll({
          where: {
            item_category: `${category}`,
            item_name: { [Op.like]: `%${name}%` },
          },
        }))
      : (sql = Item.findAll({ where: { item_category: `${category}` } }));
  }

  return sequelize
    .query(sql)
    .then((result) => res.send(result[0]))
    .catch((error) => res.send(error));
};

module.exports = {
  addItem,
  getAllItems,
  getItem,
  deleteItem,
  findItem,
};
