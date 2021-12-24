const router = require('express').Router()
const asyncTryCatchMiddleware = require('../middlewares/asyncTryCatchMiddleware')
const productApi = require('./api/product')
const customerApi = require('./api/customer')
const orderApi = require('./api/order')

router.use('/v1', asyncTryCatchMiddleware, productApi)
router.use('/v1', asyncTryCatchMiddleware, customerApi)
router.use('/v1', asyncTryCatchMiddleware, orderApi)

module.exports = router
