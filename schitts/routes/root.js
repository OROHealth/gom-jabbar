const router = require('express').Router()
const isAuthenticated = require('../middlewares/authenticateMiddleware')
const productApi = require('./api/product')
const customerApi = require('./api/customer')
const orderApi = require('./api/order')
const managerApi = require('./api/manager')
const dishApi = require('./api/dish')
const userApi = require('./api/user')

router.use('/v1/user', userApi)

router.use('/v1/customer', isAuthenticated, customerApi)
router.use('/v1/product', isAuthenticated, productApi)
router.use('/v1/order', isAuthenticated, orderApi)
router.use('/v1/manager', isAuthenticated, managerApi)
router.use('/v1/dish', isAuthenticated, dishApi)

module.exports = router
