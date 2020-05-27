const Sequelize = require("sequelize");
const db = require("../database/db");

const Order = db.sequelize.define("order", {
  order_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  item_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  item_owner: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  item_buyer: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  order_message: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: "I'm interested in that product!",
  },
  order_answer: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: "Offer review in progress...",
  },
  order_offer: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  order_init: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  order_process: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  order_success: {
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

module.exports = Order;
