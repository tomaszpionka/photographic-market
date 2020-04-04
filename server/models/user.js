const Sequelize = require("sequelize");
const db = require("../database/db");

const User = db.sequelize.define("user", {
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  user_name: {
    type: Sequelize.STRING,
  },
  user_surname: {
    type: Sequelize.STRING,
  },
  user_email: {
    type: Sequelize.STRING,
  },
  user_password: {
    type: Sequelize.STRING,
  },
  user_city: {
    type: Sequelize.STRING,
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

module.exports = User;
