const db = require('../db/connection');
const logger = require('../logger');
const tablename = "test_items";

const createItem = (name, category) => {
    const query = `
    INSERT INTO ${tablename}
    (name, category)
    VALUES ($1, $2)
    RETURNING *
    `
    logger.info("Creating item...");
    return db.one(query, [name, category])
}

const findItemById = (id) => {
    const query = `
    SELECT *
    FROM ${tablename}
    WHERE id=$1
    `
    logger.info("Finding item by id...");
    return db.oneOrNone(query, [id])
}

const findItemByName = (name) => {
    const query = `
    SELECT *
    FROM ${tablename}
    WHERE name=$1
    `
    logger.info("Finding item by name...");
    return db.one(query, [name])
}

const findItemByCategory = (category) => {
    const query = `
    SELECT *
    FROM ${tablename}
    WHERE category=$1
    `
    logger.info("Finding item by name...");
    return db.one(query, [category])
}

module.exports = {createItem, findItemById, findItemByCategory, findItemByName};