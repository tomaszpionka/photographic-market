const db = require("../database/db");

const getUsers = async (req, res) => {
  try {
    const { admin } = req.body;
    console.log(admin);
    const getUsers = await db.sequelize.query(`SELECT * FROM users`);

    res.json(getUsers[0]);
  } catch (err) {
    console.error(err.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateItems = await db.sequelize.query(
      `DELETE from items WHERE item_owner = '${id}' RETURNING *`
    );
    const updateUser = await db.sequelize.query(
      `DELETE from users WHERE user_id = '${id}' RETURNING *`
    );
    if (updateUser[0].length === 0) {
      return res.json("user not deleted");
    }
    res.json(`user ${id} and items deleted`);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  getUsers,
  deleteUser,
};
