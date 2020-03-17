const express = require('express');
const passportService = require('../services/passport');
const passport = require('passport');
const authRouter = express.Router();

const authController = require('../controllers/auth');

const requireAuth = passport.authenticate('jwt', { session: false});
const requireSignin = passport.authenticate('local', {session: false});

authRouter.get('/', requireAuth, (req, res) => {
    res.send({hi: 'there'});
})
authRouter.post('/signup', authController.signup);
authRouter.post('/signin', requireSignin, authController.signin)

module.exports = authRouter;

