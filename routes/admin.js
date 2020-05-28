const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const authorize = require("../middleware/authorize");

router.get("/users", /*authorize,*/ jsonParser, adminController.getUsers);
router.delete("/users/:id", authorize, jsonParser, adminController.deleteUser);

module.exports = router;
