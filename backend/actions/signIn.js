const db = require('../db/connection');
const logger = require('../logger');
const tablename = "test";

const findUserById = (id) => {
    const query = `
    SELECT *
    FROM ${tablename}
    WHERE id=$1
    `
    logger.info("Finding user...");
    return db.oneOrNone(query, [id])
}

const verifyUser = (email) => {
    const query = `
    SELECT *
    FROM ${tablename}
    WHERE email=$1
    `
    logger.info("Verifying user...");
    return db.oneOrNone(query, [email])
}

module.exports = {findUserById, verifyUser};