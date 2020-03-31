const express = require("express");
const router = express.Router();
const userController = require('../controllers/user');
const bodyParser = require('body-parser');

router.use('/', bodyParser.json(), userController.getAllUsers);

module.exports = router;
