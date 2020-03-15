const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json())
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
})
