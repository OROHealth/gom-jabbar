const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const port = 8000

const {addUser,getUser}=require("./handlers");
express()
    .use(express.json())
    .use(helmet())
    .use(morgan('tiny'))

    .get('/users/:email/:password',getUser)
    .post('/user',addUser)

    .listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })