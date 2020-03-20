const express = require('express');
const passportService = require('../services/passport');
const passport = require('passport');
const authRouter = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const authController = require('../controllers/auth');

const requireAuth = passport.authenticate('jwt', { session: false});
const requireSignin = passport.authenticate('local', {session: false});

authRouter.get('/', jsonParser, requireAuth, (req, res) => {
    res.send({hi: 'there'});
})
authRouter.post('/signup', jsonParser, authController.signup);
authRouter.post('/signin', jsonParser, requireSignin, authController.signin)

module.exports = authRouter;

