const router = require('express').Router();
const customerController = require('../controllers/customer.controller');
const customer = require('../models/customer.model');


router.get('/', customerController.getAllCustomer);
router.get('/search/:type', customerController.typeInfo);
router.get('/:id', customerController.customerInfo);
router.post('/', customerController.createCustomer);

module.exports = router;