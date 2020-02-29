const express = require('express');
const passport = require('passport');

const Items = require('../controllers/items');

/// we are setting session to false because JWTs don’t require sessions on the server.
const requireSignin = passport.authenticate('local', { session: false });

const router = express.Router();

/// We are first going to route the user through Passport, and if they pass, they will move on to the signin function, which will pass them a token

router.post('/items', requireSignin, Items.createitem);

module.exports = router;