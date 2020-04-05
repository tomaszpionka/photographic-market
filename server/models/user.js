const Sequelize = require("sequelize");
const db = require("../database/db");

const User = db.sequelize.define("user", {
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  user_email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        msg: "Must be a valid email address",
      },
    },
  },
  user_password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  user_name: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "john",
  },
  user_surname: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "doe",
  },
  user_phone: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "+48 987 654 321",
  },
  user_city: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "warsaw",
  },
  user_image: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue:
      "https://react.semantic-ui.com/images/avatar/large/matthew.png",
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
