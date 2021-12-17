const router = require('express').Router()
const asyncTryCatchMiddleware = require('../middlewares/asyncTryCatchMiddleware')
const api = require('./api')

router.use('/v1', asyncTryCatchMiddleware, api)

module.exports = router
