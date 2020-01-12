var express = require('express');
var app = express();
var cors = require('cors');
const productStore = require('./productStore');

app.use(cors());

app.get('/products', function(req, res) {
  return res.json(productStore.getProducts());
});

app.get('/products/:id', function(req, res) {
  return res.json(productStore.getProductById(req.params.id));
});
app.delete('/products/:id', function(req, res) {
  productStore.getProductById(req.params.id, () => {
    res.json({});
  });
});
const runServer = port => {
  console.log(`Server is running on port${port}`);
  app.listen(port);
};

module.exports = { runServer };
