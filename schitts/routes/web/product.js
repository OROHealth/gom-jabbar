const ProductController = require('../../controllers/ProductController')
// const asyncTryCatchMiddleware = require('./root').asyncTryCatchMiddleware
const router = require('express').Router()

router.get('/', ProductController.index)
router.get('/:reference', ProductController.edit)
/* router.post('/', ProductController.store)
router.patch(':product_id', ProductController.update)
router.delete('/:product_id', ProductController.destroy) */

// the way we could define a router middleware
// this code is executed each time we have a param in the path
router.param('product_id', (req, res, next, id) => {
  console.log('router param id: ' + id)
  next()
  // we can pass any result by doing
  // req.item = value
})

module.exports = router
