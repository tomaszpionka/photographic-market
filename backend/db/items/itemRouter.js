const express = require("express");
const ItemControllers = require("./itemControllers");

const fs = require("fs");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

const jsonBodyParser = bodyParser.json();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "backend/assets/itemsImages");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

class ItemRouter {
  constructor() {
    this.router = express.Router();
    this.controller = new ItemControllers();
    this.routes();
  }

  routes() {
    this.router.post("/", upload.array("img", 5), this._addItem.bind(this));
    this.router.get("/", jsonBodyParser, this._getAllItems.bind(this));
    this.router.delete("/:id", jsonBodyParser, this._deleteItem.bind(this));
  }

  _addItem(req, res) {
    const { userId, itemName, category, description } = req.body;
    console.log(req.files);
    const images = this.controller.collectImgsPath(req.files);

    this.controller
      .insertItem(userId, itemName, category, description, images)
      .then(result => res.send({ result }))
      .catch(error =>
        res.status(500).send(`SQL ERROR ${error.code} - ${error.detail}`)
      );
  }

  _getAllItems(req, res) {
    this.controller
      .getAllItems()
      .then(result => res.send(result.rows))
      .catch(error =>
        res.status(500).send(`SQL ERROR ${error.code} - ${error.detail}`)
      );
  }

  _deleteItem(req, res) {
    // console.log(req)
    const id = req.params.id;

    this.controller
      .deleteItem(id)
      .then(result => res.send(result))
      .catch(error =>
        res.status(500).send(`SQL ERROR ${error.code} - ${error.detail}`)
      );
  }
}

module.exports = ItemRouter;
