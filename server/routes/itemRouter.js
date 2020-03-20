const express = require("express");
const ItemController = require("../controllers/itemController");
const multer = require("multer");
const path = require("path");

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

itemRouter.get('/', ItemController.getAllItems);
// itemRouter.post('/', upload.array("img", 3), ItemController.addItem)

module.exports = itemRouter;