const router = require('express').Router()
const asyncTryCatchMiddleware = require('../middlewares/asyncTryCatchMiddleware')
const productApi = require('./api/product')
const customerApi = require('./api/customer')

router.use('/v1', asyncTryCatchMiddleware, productApi)
router.use('/v1', asyncTryCatchMiddleware, customerApi)

module.exports = router
