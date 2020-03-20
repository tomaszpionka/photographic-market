const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');
const morgan = require('morgan');

const router = require('./routes/index');

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan('combined'));
app.use(cors());
// app.use(bodyParser.json({type: '*/*'}))
// app.use(
//     bodyParser.urlencoded({
//         extended: false
//     })
// );

app.use('/', router);

app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
})