const bodyParser = require('body-parser');
const express = require('express');
const customerRoutes = require('./routes/customer.routes');
const menuRoutes = require('./routes/menu.routes');
const orderRoutes = require('./routes/order.router')
const customer = require('./models/customer.model');
require('dotenv').config({path: './config/.env'});
require('./config/database');
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

//routes
app.use('/api/customer', customerRoutes);
//app.use('/api/menu', menuRoutes);
app.use('/api/order', orderRoutes);

//ecoutes sur la variable d'environnement 
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})