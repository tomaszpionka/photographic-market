const passport = require('passport');
const bcrypt = require('bcrypt');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const config = require('../config');
const User = require('../controllers/user');

const localOptions = {
  usernameField: 'email'
};
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
  
  User.getUserByMailController(email)
    .then(user => {
      if (!user) {
        return done(null, false);
      }      
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return done(err);
        }
        if (!isMatch) {
          return done(null, false);
        }
        return done(null, user);
      });
    })
    .catch(err => {
      return done(err);
    })
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {

  User.getUserByIdController(payload.sub)
    .then(user => {
      if (user) {
        done(null, user);
      } else {
        done(null, false)
      }
    })
    .catch(err => {
      return done(err, false)
    })
});

passport.use(jwtLogin);
passport.use(localLogin);