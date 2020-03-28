const Item = require('../models/item');

const addItemController = req => {
  return Item.create({
    title: req[0],
    price: req[1],
    imageUrl: req[2],
    description: req[3],
    userId: req[4]
  });
};

const getItemByIdController = x => {
  return Item.findOne({
    where: {
      id: x
    }
  });
};

const deleteItemByIdController = x => {
  return Item.destroy({
    where: {
      id: x
    }
  });
};

const getItemsByUserController = x => {
  return Item.findAll({
    where: {
      userId: x
    }
  });
};

const updateItemData = req => {
  return Item.update(
    {
      title: req[1],
      price: req[2],
      imageUrl: req[3],
      description: req[4]
    },
    {
      where: {
        id: req[0]
      }
    }
  );
};

module.exports = {
  addItemController,
  getItemByIdController,
  deleteItemByIdController,
  getItemsByUserController,
  updateItemData
};
