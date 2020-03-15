const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user');
process.env.SECRET_KEY = 'secret'

exports.register = (req, res) => {
    const userData = {
        // first_name: req.body.first_name,
        // last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
    }

    User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(result => {
            if (!result) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash;
                    User.create(userData)
                        .then(result => {
                            // result.createCart();
                            let token = jwt.sign(result.dataValues, process.env.SECRET_KEY, {
                                expiresIn: 1440
                            })
                            res.send(token)
                        })
                        .catch(err => {
                            res.send('error:', err);
                            console.log(err);
                        })
                })
            } else {
                res.json({
                    error: 'user already exists'
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
}

exports.login = (req, res) => {
    User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(result => {
            if (result) {
                if (bcrypt.compareSync(req.body.password, result.password)) {

                    let token = jwt.sign(result.dataValues, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
                } else {
                    res.status(400).json({
                        error: 'wrong password'
                    });
                }
            } else {
                res.status(400).json({
                    error: 'user does not exist'
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                error: err
            });
            console.log(err);
        })
}

exports.getProfile = (req, res) => {
    const decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    User.findOne({
            where: {
                id: decoded.id
            }
        })
        .then(result => {
            if (result) {
                res.json(result)
            } else {
                res.send('user does not exist')
            }
        })
        .catch(err => {
            res.send('error', err)
        })
}