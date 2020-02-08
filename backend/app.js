const express = require('express');
const app = express();
const cors = require('cors');
const AuthRouter = require("./db/users/userRouter");
const DbRouter = require("./db/items/itemRouter");

class AppRouter {
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes(){
    this.router.use('/auth', new AuthRouter().router);
    this.router.use('/item', new DbRouter().router);
  }
};

app.use(cors());

// app.get('/', function(req, res) {
//   return res.json({});
// });

const runServer = port => {
  console.log(`Server is running on port${port}`);
  app.listen(port);
};

module.exports = { runServer };
