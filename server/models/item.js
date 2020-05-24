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
    allowNull: false,
    defaultValue: "photographic item",
  },
  item_description: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: "great stuff, you should check it out!",
  },
  item_category: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "other",
  },
  item_price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  item_image_url: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue:
      "https://ya-webdesign.com/transparent250_/film-camera-png-5.png",
  },
  item_images: {
    type: Sequelize.JSON,
    allowNull: false,
    defaultValue: "item",
  },
  item_owner: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  item_lock: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn("NOW"),
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn("NOW"),
  },
});

module.exports = Item;
