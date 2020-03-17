const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

const User = require('../models/user');

const tokenForUser = (user) => {
    const timestamp = new Date().getTime();
    return jwt.sign({
            sub: user.id,
            email: user.email,
            iat: timestamp,
            type: 'ACCESS_TOKEN'
        },
        config.secret, {
            expiresIn: 3600
        });

};

const signin = function (req, res, next) {
    res.send({
        token: tokenForUser(req.user)
    });
}

const signup = function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send({
            error: 'You must provide email and password'
        });
    }

    User.findOne({
            where: {
                email: email
            }
        })
        .then(user => {
            if (user) {
                return res.status(422).send({
                    error: 'email is in use'
                });
            }
            user = {
                email: email,
                password: password
            }

            bcrypt.hash(user.password, 10, (err, hash) => {
                if (err) {
                    return next(err);
                }

                user.password = hash;
                User.create(user)
                    .then(user => {

                        res.json({
                            token: tokenForUser(user)
                        })
                    })
                    .catch(err => {
                        return next(err);
                    })
            })
        })
}

module.exports = {
    signup,
    signin
}