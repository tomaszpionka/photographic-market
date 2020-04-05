const fs = require("fs");
const Item = require("../models/item");
const User = require("../models/user");

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

const getItemById = (req, res) => {
  Item.findOne({
    where: { todo_id: req.params.id },
    include: [{ model: User, as: "ownerRef" }],
  })
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getItems = (req, res) => {
  Item.findAll({
    order: [["createdAt", "DESC"]],
    include: [{ model: User, as: "ownerRef" }],
  })
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  addItem,
  getAllItems,
  getItem,
  getItems,
};
