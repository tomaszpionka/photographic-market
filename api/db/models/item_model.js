

const connection = require('../connection');
const tableItem = 'items';

const insertItem = () => {
    const sql = `
    INSERT INTO ${tableItem}
    VALUES (
            DEFAULT, 1, 'aparat fot', 'aparaty fotograficzne', 'super aparat', '{"image1": "https://czarno-biale.pl/sklep/18956-home_default/kodak-color-plus-20024-amatorski-film-do-zdjec-kolorowych.jpg"}'

    )
    `;
    return connection.query(sql);
};
const getItems = () => {
    const sql = `
    SELECT * FROM ${tableItem};
    `;
    return connection.query(sql);
};
const getItem = (id) => {
    const sql = `SELECT * FROM ${tableItem} WHERE item_id = ${id};`;
    return connection.query(sql).then((response) => response.rows)
}
//insertItem();
//getItems().then((res) => console.log(res.rows));
getItem(1).then((res) => console.log(res));
module.export = { getItems, getItem}