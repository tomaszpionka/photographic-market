const express = require("express");
const path = require("path");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;

// process.env.PORT
// process.env.NODE_ENV => production or undefined

app.use(morgan("combined"));
app.use(cors());

if (process.env.NODE_ENV === "production") {
  // server static content
  // npm run build
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.use("/auth", require("./routes/auth"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/items", require("./routes/item"));
app.use("/users", require("./routes/user"));
app.use("/orders", require("./routes/order"));
app.use("/static", express.static(path.join(__dirname, "assets")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

const db = require("./database/db");
const User = require("./models/user");
const Item = require("./models/item");
const Order = require("./models/order");

Item.belongsTo(User, { as: "ownerRef", foreignKey: "item_owner" });

db.sequelize
  .authenticate()
  .then(() => {
    console.log("connection authenticated");
  })
  .catch((err) => {
    console.error("unable to connect", err);
  });

db.sequelize
  .sync({
    // logging: console.log,
    // force: true,
  })
  .then(() => {
    console.log("connection to database");
    app.listen(PORT, () => {
      console.log(`server is running on port: ${PORT}`);
    });
  });
