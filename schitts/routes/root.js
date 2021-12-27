const router = require('express').Router()
const asyncTryCatchMiddleware = require('../middlewares/asyncTryCatchMiddleware')
const productApi = require('./api/product')
const customerApi = require('./api/customer')
const orderApi = require('./api/order')
const managerApi = require('./api/manager')
const dishApi = require('./api/dish')

router.use('/v1', asyncTryCatchMiddleware, productApi)
router.use('/v1', customerApi)
router.use('/v1', orderApi)
router.use('/v1', managerApi)
router.use('/v1', dishApi)

module.exports = router
