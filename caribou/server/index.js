const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const port = 8000

const {addUser,getUser}=require("./handlers");
const {addHuman,getHuman, getCaribou, addCaribou}=require("./handlers-human");
express()
    .use(express.json())
    .use(helmet())
    .use(morgan('tiny'))

    .get('/users/:email/:password',getUser)
    .post('/user',addUser)
    
    .get('/humans',getHuman)
    .post('/humans',addHuman)

    .get('/caribous',getCaribou)
    .post('/caribous',addCaribou)

    .listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })