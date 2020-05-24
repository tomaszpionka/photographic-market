const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const validInfo = require("../middleware/validInfo");
const authorize = require("../middleware/authorize");

const authController = require("../controllers/auth");

router.post("/register", jsonParser, validInfo, authController.register);

router.post("/login", jsonParser, validInfo, authController.login);

router.post("/verify", authorize, authController.verify);

module.exports = router;
