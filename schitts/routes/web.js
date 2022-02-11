const router = require('express').Router()
const asyncTryCatchMiddleware = require('../middlewares/asyncTryCatchMiddleware')
const productWeb = require('./web/product')

router.use('/product', asyncTryCatchMiddleware, productWeb)

module.exports = router
