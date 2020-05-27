const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(process.env.PWD, ".env") });
const Sequelize = require("sequelize");
// const config = require("../config");

const devConfig = `${process.env.PG_DIALECT}://${process.env.PG_USERNAME}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:5432/${process.env.PG_DATABASE}`;

const proConfig = process.env.DATABASE_URL;

const db = {};

const sequelize = new Sequelize(
  process.env.NODE_ENV === "production" ? proConfig : devConfig
);

// const sequelize = new Sequelize(
//   process.env.PG_DATABASE,
//   process.env.PG_USERNAME,
//   process.env.PG_PASSWORD,
//   {
//     dialect: process.env.PG_DIALECT,
//     host: process.env.PG_HOST,
//     logging: false,
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000,
//     },
//   }
// );

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
