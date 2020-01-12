const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/', function(req, res) {
  return res.json({});
});

const runServer = port => {
  console.log(`Server is running on port${port}`);
  app.listen(port);
};

module.exports = { runServer };
