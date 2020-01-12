const { Client } = require('pg');
const config = require("../config.json");

const client = new Client(config.DB);
client.connect();

client.query('SELECT NOW()', (err, res) => {
    console.log("db connected");
});

module.exports = client;
