const connection = require ('../connection');
const tableName = 'users';

const insertUser = () => {
    const sql = `
    INSERT INTO ${tableName}
    VALUES (
        DEFAULT, 'test@testowy.test', 'akhdks', '34456haksdlk', 'jan', 'nowak', 'm',
        'Polska', 'Warszawa', 'mazowieckie', '02-223', 'Long', '32s', '2', POINT(52.4, 24.4)
    )
    `;
    return connection.query(sql);
}

const getUsers = () => {
    const sql = `
        SELECT* FROM ${tableName};
    `;
    return connection.query(sql);
}

// insertUser();

getUsers().then(res => console.log(res.rows));