class UserControllers {
    constructor() {
        // this.tableUser = "users";
        this.tableUser = "register";
        this.connection = require("../connection");
    }

    insertUser(email, password) {
        const sql = `
    INSERT INTO ${this.tableUser} VALUES (
    DEFAULT,
    '${email}',
    '${password}'
     )`;
        return this.connection.query(sql);
    }

    getAllUsers() {
        const sql = `
    SELECT * FROM ${this.tableUser};
    `;
        return this.connection.query(sql);
    }

    getUser(id) {
        const sql = `SELECT * FROM ${this.tableUser} WHERE id = ${id}`;
        return this.connection.query(sql);
    }

    deleteUser(id) {
        const sql = `DELETE FROM ${this.tableUser} WHERE id = ${id} RETURNING *`;
        return this.connection.query(sql);
    }
}

module.exports = UserControllers;