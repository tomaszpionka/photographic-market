const express = require('express');
const app = express();
const cors = require('cors');
const UserRouter = require("./db/users/userRouter");
const ItemRouter = require("./db/items/itemRouter");


app.use(cors());

class AppRouter {
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes(){
    this.router.use('/user', new UserRouter().router);
    this.router.use('/item', new ItemRouter().router);
  }
};

app.use("/api", new AppRouter().router);

// app.get('/', function(req, res) {
//   return res.json({});
// });

const runServer = port => {
  console.log(`Server is running on port${port}`);
  app.listen(port);
};

module.exports = { runServer };
