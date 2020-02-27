const db = require('../db/connection');
const logger = require('../logger');
const tablename = "test";

const createUser = (email, password) => {
    const query = `
    INSERT INTO ${tablename}
    (email, password)
    VALUES ($1, $2)
    RETURNING *
    `
    logger.info("Creating user...");
    return db.one(query, [email, password])
}

module.exports = {createUser};