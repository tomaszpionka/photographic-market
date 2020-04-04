const express = require("express");
const path = require("path");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(morgan("combined"));
app.use(cors());

app.use("/auth", require("./routes/auth"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/items", require("./routes/item"));
app.use("/users", require("./routes/user"));
app.use("/static", express.static(path.join(__dirname, "assets")));

const db = require("./database/db");
const User = require("./models/user");
const Item = require("./models/item");

Item.belongsTo(User, { as: "ownerRef", foreignKey: "item_owner" });

db.sequelize
  .authenticate()
  .then(() => {
    console.log("connection authenticated");
  })
  .catch((err) => {
    console.error("unable to connect", err);
  });

db.sequelize.sync({ logging: console.log, force: false }).then(() => {
  console.log("connection to database");
  app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
  });
});
