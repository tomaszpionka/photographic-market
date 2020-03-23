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

const getItemsByUserController = x => {
  return Item.findOne({
    where: {
      userId: x
    }
  });
};

const updateItemData = req => {
  return Item.update(
    {
      item_name: req[1],
      category: req[2],
      description: req[3],
      image_url: req[4]
    },
    {
      where: {
        item_id: req[0]
      }
    }
  );
};

module.exports = {
  addItemController,
  getItemByIdController,
  getItemsByUserController,
  updateItemData
};
