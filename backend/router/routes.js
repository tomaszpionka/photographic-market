const express = require('express');
const auth = require('./authentication');
 
const passport = require('passport');
const passportService = require('../services/passport');

/// we are setting session to false because JWTs don’t require sessions on the server
const requireAuth = passport.authenticate('jwt', { session: false });

const routes = express.Router();

routes.get('/', requireAuth, (req, res) => res.send("you found me!"))
routes.use('/auth', auth);

module.exports = routes;