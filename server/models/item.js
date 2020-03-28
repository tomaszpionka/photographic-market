const Sequelize = require('sequelize');
const db = require('../database/db');
const User = require('./user');

const Item = db.sequelize.define(
    'item',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        title: {
            type: Sequelize.STRING(128),
            allowNull: false,
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        imageUrl: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        userId: {
            type: Sequelize.INTEGER,
        }
    }
)

Item.belongsTo(User, {underscored: true});
User.hasMany(Item, {underscored: true});

module.exports = Item;