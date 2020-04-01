const express = require("express");
const router = express.Router();
const userController = require('../controllers/user');
const bodyParser = require('body-parser');

router.get('/', bodyParser.json(), userController.getAllUsers);
router.get('/find', bodyParser.json(), userController.findUser);

module.exports = router;
