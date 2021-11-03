require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const { PORT, DB_URI } = process.env;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB Connected')
});

require('./server/routes')(app);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));