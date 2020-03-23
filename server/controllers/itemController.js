const fs = require('fs');
const { sequelize, Sequelize } = require('../database/db');
const table = 'items_old';


const insertItem = (userId, itemName, category, description, images) => {
    const sql = `INSERT INTO ${table} VALUES (
        DEFAULT, 
        ${parseInt(userId)}, 
        '${itemName}', 
        '${category}', 
        '${description}', 
        '${JSON.stringify(images)}'
    )`;

    return sequelize.query(sql);
}

const collectImgsPath = files => {
    const images = {};
    for (let i = 0; i < files.length; i++) {
        images[`img${i}`] = files[i].path;
    }

    return images;
}

const addItem = (req, res) => {
    const { userId, itemName, category, description } = req.body;
    const images = collectImgsPath(req.files);

    insertItem(userId, itemName, category, description, images)
        .then(result => res.send({ result }))
        .catch(error => res.status(500).send(`SQL ERROR ${error}`));
}

const getAll = () => {
    const sql = `SELECT * FROM ${table}`;
    return sequelize.query(sql);
}
const getAllItems = (req, res) => {
    getAll() 
        .then(result => res.send(result[0]))
        .catch(error => res.status(500).send(`SQL ERROR ${error}`));
}

const getOne = id => {
    const sql = `SELECT * FROM ${table} WHERE item_id = ${id}`;
    return sequelize.query(sql);
}

const getItem = (req, res) => {
    const id = req.params.id;
    getOne(id)
        .then(result => res.send(result[0]))
        .catch( error => res.status(500).send(`SQL Error ${error}`));
    //TODO add 404 if result []
}

const removeItem = id => {
    const sql = `DELETE FROM ${table} WHERE item_id = ${id} RETURNING *`;
    return sequelize.query(sql);
}
const removeImg = result => {
    const img = result[0].images_json;
    const imgKeys = Object.keys(img);
    console.log(imgKeys);
    imgKeys.forEach(key => {
        // console.log(img[key]);
        fs.unlink(img[key], err => {
            if (err) throw err;
            console.log(img[key] + " was deleted");
        });
    });
}
const deleteItem = (req, res) => {
    // console.log(req)
    const id = req.params.id;

    removeItem(id)
        .then(result => {
            res.send(result);
            removeImg(result);
        })
        .catch(error =>
            res.status(500).send(`SQL ERROR ${error.code} - ${error.detail}`)
        );
}

module.exports = {
    addItem,
    getAllItems,
    getItem,
    deleteItem
}