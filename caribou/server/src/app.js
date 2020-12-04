require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { CLIENT_ORIGIN } = require('./config');
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');

//loading routers
const postsRouter = require('./posts/posts-router');

//building app object
const app = express()

//morgan settings
const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

//app using morgan cors and helmet
app.use(morgan(morganOption))
app.use(cors())
app.use(helmet())

//basic api endpoints
app.get('/', (req, res) => {
    res.send('Hello, world!')
})

//list of routers
app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);



app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
})

//exporting app to use it in the server
module.exports = app
