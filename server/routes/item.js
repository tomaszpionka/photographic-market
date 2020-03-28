const express = require("express");
const fs = require('fs')
const bodyParser = require('body-parser');
const multer = require("multer");
const path = require("path");

const itemController = require("../controllers/itemController");

const jsonParser = bodyParser.json();
const router = express.Router();

fs.mkdir('assets', { recursive: true }, (err) => {
    if (err) throw err;
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get('/', jsonParser, itemController.getAllItems);
router.get('/:id', jsonParser, itemController.getItem);
router.post('/', upload.array("img", 3), itemController.addItem);
router.delete('/:id', jsonParser, itemController.deleteItem);

module.exports = router;
