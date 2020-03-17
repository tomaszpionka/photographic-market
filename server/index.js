const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();
const port = process.env.PORT || 5000;

const authRoutes = require('./routes/authentication');

app.use(bodyParser.json())
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use('/auth', authRoutes);
app.use('/', errorController.get404);

app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
})

