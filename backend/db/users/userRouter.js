const express = require("express");
const UserControllers = require("./userControllers");
const bodyParser = require("body-parser");
const jsonBodyParser = bodyParser.json();
// const bcrypt = require("bcrypt");

class UserRouter {
    constructor() {
        this.router = express.Router();
        this.controller = new UserControllers();
        this.routes();
    }

    routes() {
        this.router.post("/register", jsonBodyParser, this._addUser.bind(this));
        this.router.get("/", jsonBodyParser, this._getAllUsers.bind(this));
        this.router.get("/:id", jsonBodyParser, this._getUser.bind(this));
        this.router.delete("/:id", jsonBodyParser, this._deleteUser.bind(this));
    }

    _addUser(req, res) {
        const { email, passwordForm } = req.body;

            this.controller
                .insertUser({email, passwordForm})
                .then(result => res.send({result}))
                .catch(error =>
                    res.status(500).send(`SQL ERROR ${error.code} - ${error}`)
                );
    }

    _getUser(req,res)   {
        const userId = req.params.id;

        this.controller
            .getUser(userId)
            .then(result => res.send(result.rows))
            .catch(error =>
            res.status(500).send(`SQL ERROR ${error.code} - ${error.detail}`)
            );
    }

    _getAllUsers(req, res) {

        this.controller
            .getAllUsers()
            .then(result => res.send(result.rows))
            .catch(error =>
                res.status(500).send(`SQL ERROR ${error.code} - ${error.detail}`)
            );
    }

    _deleteUser(req, res) {
        // console.log(req)
        const id = req.params.id;

        this.controller
            .deleteUser(id)
            .then(result => res.send(result))
            .catch(error =>
                res.status(500).send(`SQL ERROR ${error.code} - ${error.detail}`)
            );
    }
}

module.exports = UserRouter;
