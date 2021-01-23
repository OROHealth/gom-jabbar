const router = require('express').Router();
const orderController = require('../controllers/order.controller');



router.get('/', orderController.getAllorder);
//router.get('/:id', orderController.orderInfo);
router.get('/diner', orderController.dinerInfo);
router.get('/mean', orderController.meanValue);
router.get('/total/:id', orderController.totalBill);


router.post('/', orderController.createOrder);

router.put('/:id', orderController.updateOrder);

router.patch('/add-order/:id', orderController.menuAdd)

module.exports = router;