const Sequelize = require("sequelize");
const db = require("../database/db");

const Item = db.sequelize.define("item", {
  item_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  item_name: {
    type: Sequelize.STRING,
  },
  user_description: {
    type: Sequelize.STRING,
  },
  item_category: {
    type: Sequelize.STRING,
  },
  item_price: {
    type: Sequelize.INTEGER,
  },
  item_imageUrl: {
    type: Sequelize.STRING,
  },
  item_images: {
    type: Sequelize.JSON,
  },
  item_owner: {
    type: Sequelize.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn("NOW"),
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn("NOW"),
  },
});

module.exports = Item;
