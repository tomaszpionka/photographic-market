const express = require('express');
const router = express.Router();

const authRouter = require('./authRouter');
const itemRouter = require('./itemRouter')

router.use('/auth', authRouter);
router.use('/item', itemRouter);

module.exports = router;