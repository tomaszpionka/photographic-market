const initOptions = {
    // global event notification;
    error(error, e) {
        if (e.cn) {
            // A connection-related error;
            //
            // Connections are reported back with the password hashed,
            // for safe errors logging, without exposing passwords.
            console.log('CN:', e.cn);
            console.log('EVENT:', error.message || error);
        }
    }
};

const pgp = require("pg-promise")(initOptions);
const config = require("../config.json");
const logger = require("../logger");

const cn = {
    "host": config.DB.host,
    "port": config.DB.port,
    "database": config.DB.database,
    "user": config.DB.user,
    "password": config.DB.password
};

logger.info("Connecting to the db...");

const db = pgp(cn);

db.connect()
    .then(obj => {
        // Can check the server version here (pg-promise v10.1.0+):
        const serverVersion = obj.client.serverVersion;

        obj.done(); // success, release the connection;
    })
    .catch(error => {
        console.log('ERROR:', error.message || error);
    });

module.exports = db;