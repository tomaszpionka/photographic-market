const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const authorize = require("../middleware/authorize");

router.get("/", jsonParser, userController.getAllUsers);
router.get("/find", jsonParser, userController.findUser);
router.get("/query", jsonParser, userController.userQuery);

router.put("/name/:id", authorize, jsonParser, userController.updateName);
router.put("/surname/:id", authorize, jsonParser, userController.updateSurname);
router.put("/phone/:id", authorize, jsonParser, userController.updatePhone);
router.put("/city/:id", authorize, jsonParser, userController.updateCity);
router.put("/image/:id", authorize, jsonParser, userController.updateImageUrl);

module.exports = router;
