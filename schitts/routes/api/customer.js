const CustomerController = require('../../controllers/CustomerController')
// const asyncTryCatchMiddleware = require('./root').asyncTryCatchMiddleware
const router = require('express').Router()
const prefix = 'customer'

/**
 * @swagger
 * components:
 *  schemas:
 *    Customer:
 *      type: object
 *      required:
 *        - first_name
 *        - last_name
 *        - email
 *        - phone_number
 *      properties:
 *        id:
 *          type: integer
 *          description: The auto-generated id of the product
 *        first_name:
 *          type: string
 *          description: The first name of customer
 *        last_name:
 *          type: string
 *          description: the customer's last name
 *        reference:
 *          type: string
 *          description: the reference of the product
 *        email:
 *          type: string
 *          description: knowing if product is published or not
 *        phone_number:
 *          type: string
 *          description: The customer's phone number
 *      example:
 *        first_name: David
 *        last_name: DuChovni
 *        email: david_duchovni@example.com
 *        phone_number: +235 965854625
 */

/**
 * @swagger
 * tags:
 *  name: Customer
 *  description: The customers managing APi
 */

/**
 * @swagger
 * /api/v1/customer:
 *  get:
 *    summary: returns the list of all customers
 *    tags: [Customer]
 *    responses:
 *      200:
 *        description: the list of the customers
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Customer'
 */
router.get(`/${prefix}`, CustomerController.index)

/**
 * @swagger
 * /api/v1/customer:
 *  post:
 *    summary: store a new customer
 *    tags: [Customer]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Customer'
 *    responses:
 *      200:
 *        description: the new customer
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Customer'
 *      500:
 *        description: Server Error
 */
router.post(`/${prefix}`, CustomerController.store)

/**
  * @swagger
  * /api/v1/customer/{id}:
  *  get:
  *    summary: get the customer by id
  *    tags: [Customer]
  *    parameters:
  *      - in: path
  *        name: id
  *        schema:
  *          type: string
  *        required: true
  *        description: the customer id
  *    responses:
  *      200:
  *        description: fetch customer by id
  *        contens:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/Customer'
  *      404:
  *        description: The customer was not found
  */
router.get(`/${prefix}/:customer_id`, CustomerController.edit)

/**
  * @swagger
  * /api/v1/customer/{id}:
  *  patch:
  *    summary: update the customer by id
  *    tags: [Customer]
  *    parameters:
  *      - in: path
  *        name: id
  *        schema:
  *          type: string
  *        required: true
  *        description: the customer id
  *    requestBody:
  *      required: true
  *      content:
  *        application/json:
  *          schema:
  *            $ref: '#/components/schemas/Customer'
  *    responses:
  *      200:
  *        description: The updated customer
  *        contens:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/Customer'
  *      404:
  *        description: The customer was not found
  */
router.patch(`/${prefix}/:customer_id`, CustomerController.update)

/**
  * @swagger
  * /api/v1/customer/{id}:
  *  delete:
  *    summary: delete the customer by id
  *    tags: [Customer]
  *    parameters:
  *      - in: path
  *        name: id
  *        schema:
  *          type: string
  *        required: true
  *        description: the customer id
  *    responses:
  *      200:
  *        description: the customer description by id
  *        contens:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/Customer'
  *      404:
  *        description: The customer was not found
  */
router.delete(`/${prefix}/:product_id`, CustomerController.destroy)

/* router.route(`/${prefix}`)
   .get(CustomerController.index)
   .post(CustomerController.store)

 router.route(`/${prefix}/:product_id`)
   .get(CustomerController.edit)
   .patch(CustomerController.update)
   .delete(CustomerController.destroy) */

module.exports = router
