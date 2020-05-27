const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const authorize = require("../middleware/authorize");
const fs = require("fs");
const multer = require("multer");
const path = require("path");

const itemController = require("../controllers/item");

fs.mkdir("assets", { recursive: true }, (err) => {
  if (err) throw err;
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.array("img", 3), itemController.addItem);
router.get("/", jsonParser, itemController.getItems);
router.get("/query", jsonParser, itemController.searchItem);
router.put("/name/:id", authorize, jsonParser, itemController.updateName);
router.put(
  "/description/:id",
  authorize,
  jsonParser,
  itemController.updateDescription
);
router.put("/price/:id", authorize, jsonParser, itemController.updatePrice);
router.put("/image/:id", authorize, jsonParser, itemController.updateImage);
router.put(
  "/owner/:item_id/:item_owner/:user_id",
  authorize,
  jsonParser,
  itemController.updateOwner
);
router.delete("/:id", jsonParser, itemController.deleteItem);

module.exports = router;
