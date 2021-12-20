const ProductController = require('../controllers/ProductController')
// const asyncTryCatchMiddleware = require('./root').asyncTryCatchMiddleware
const router = require('express').Router()
let prefix = 'product'

/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      required:
 *        - title
 *      properties:
 *        id:
 *          type: integer
 *          description: The auto-generated id of the product
 *        title:
 *          type: string
 *          description: the description of the product
 *        reference:
 *          type: string
 *          description: the reference of the product
 *        price:
 *          type: integer
 *          description: thr price product
 *        published:
 *          type: boolean
 *          description: knowing if product is published or not
 *        description:
 *          type: string
 *          description: the description of the product
 *      example:
 *        id: 1
 *        title: the title of the product
 *        description: the description of the product
 *        reference: the reference of the product
 *        price: 12500
 *        published: true
 */

/**
 * @swagger
 * tags:
 *  name: Product
 *  description: The products managing APi
 */

/**
 * @swagger
 * /api/v1/product:
 * get:
 *  summary: returns the list of all products
 *  tags: [Product]
 *  responses:
 *    200:
 *      description: the list of the products
 *      content:
 *       application/json:
 *        schema:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Product'
 */
router.get(`/${prefix}`, ProductController.index)
router.post(`/${prefix}`, ProductController.store)

/**
 * @swagger
 * /api/v1/product/{id}:
 *  get:
 *    summary: get the product by id
 *    tags: [Product]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the product id
 *    responses:
 *      200:
 *        description: the product description by id
 *        contens:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      404:
 *        description: The product was not found
 */
router.get(`/${prefix}/:product_id`, ProductController.edit)
router.patch(`/${prefix}/:product_id`, ProductController.update)
router.delete(`/${prefix}/:product_id`, ProductController.destroy)

/* router.route(`/${prefix}`)
  .get(ProductController.index)
  .post(ProductController.store)

router.route(`/${prefix}/:product_id`)
  .get(ProductController.edit)
  .patch(ProductController.update)
  .delete(ProductController.destroy) */

// the way we could define a router middleware
// this code is executed each time we have a param in the path
router.param('product_id', (req, res, next, id) => {
  console.log('router param id: ' + id)
  next()
  // we can pass any result by doing
  // req.item = value
})
// another model binding
prefix = 'another model'
module.exports = router
