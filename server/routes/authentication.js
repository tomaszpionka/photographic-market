const express = require('express');
const router = express.Router();
const cors = require('cors');
const authController = require('../controllers/authentication')


// const User = require('../models/user');
router.use(cors());

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/profile', authController.getProfile);

module.exports = router;