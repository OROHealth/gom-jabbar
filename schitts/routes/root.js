const router = require('express').Router()
const asyncTryCatchMiddleware = require('../middlewares/asyncTryCatchMiddleware')
const productApi = require('./api/product')

router.use('/v1', asyncTryCatchMiddleware, productApi)

module.exports = router
