const { addItem } = require("./_helpers");

const createItem = (req, res, next) => {
    const { name, category } = req.body;
  
    if (!name || !category) {
      return res
        .status(422)
        .send({ error: "You must provide name and category" });
    }
  
    let itemNotSaved = err => {
      res.json({ error: "Error saving item to database" });
    };
  
    let catchingError = err => {
      return next(err);
    };
  
    addItem( email, password, itemNotSaved, catchingError);
  };
  
  module.exports = { createitem };