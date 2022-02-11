const ProductController = require('../../controllers/api/ProductController')
// const asyncTryCatchMiddleware = require('./root').asyncTryCatchMiddleware
const router = require('express').Router()

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
 *        title: the title of the product
 *        description: the description of the product
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
 * /api/v1/product?page=:
 *  get:
 *    summary: returns the list of all products
 *    security:
 *      - bearerAuth: []
 *    tags: [Product]
 *    parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *        required: false
 *        description: the pagination page
 *    responses:
 *      200:
 *        description: the list of the products
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/EndPointResponse'
 */
router.get('/', ProductController.index)

/**
 * @swagger
 * /api/v1/product:
 *  post:
 *    summary: store a new product
 *    security:
 *      - bearerAuth: []
 *    tags: [Product]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *    responses:
 *      200:
 *        description: the new product
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/EndPointResponse'
 *      500:
 *        description: Server Error
 */
router.post('/', ProductController.store)

/**
 * @swagger
 * /api/v1/product/{id}:
 *  get:
 *    summary: get the product by id
 *    security:
 *      - bearerAuth: []
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
 *              $ref: '#/components/schemas/EndPointResponse'
 *      404:
 *        description: The product was not found
 */
router.get('/:product_id', ProductController.edit)

/**
 * @swagger
 * /api/v1/product/{id}:
 *  patch:
 *    summary: update the product by id
 *    security:
 *      - bearerAuth: []
 *    tags: [Product]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the product id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *    responses:
 *      200:
 *        description: The updated product
 *        contens:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/EndPointResponse'
 *      404:
 *        description: The product was not found
 */
router.patch('/:product_id', ProductController.update)

/**
 * @swagger
 * /api/v1/product/{id}:
 *  delete:
 *    summary: delete the product by id
 *    security:
 *      - bearerAuth: []
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
 *              $ref: '#/components/schemas/EndPointResponse'
 *      404:
 *        description: The product was not found
 */
router.delete('/:product_id', ProductController.destroy)

/* router.route('/')
  .get(ProductController.index)
  .post(ProductController.store)

router.route('/:product_id')
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

module.exports = router
