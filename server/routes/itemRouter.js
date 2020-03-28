const express = require("express");
const bodyParser = require('body-parser');
const multer = require("multer");
const path = require("path");

const itemController = require("../controllers/itemController");

const jsonParser = bodyParser.json();
const itemRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

itemRouter.get('/', jsonParser, itemController.getAllItems);
itemRouter.get('/:id', jsonParser, itemController.getItem);
itemRouter.post('/', upload.array("img", 3), itemController.addItem);
itemRouter.delete('/:id', jsonParser, itemController.deleteItem);

module.exports = itemRouter;