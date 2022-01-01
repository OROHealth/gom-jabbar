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
 *        - address
 *        - city
 *        - favorite_food
 *        - favorite_drink
 *        - bill_split
 *        - type
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
 *        address:
 *          type: string
 *          description: The customer's address
 *        city:
 *          type: string
 *          description: The customer's city
 *        favorite_food:
 *          type: string
 *          description: The customer's favorite food id
 *        favorite_drink:
 *          type: string
 *          description: The customer's favorite drink id
 *        bill_split:
 *          type: string
 *          description: The customer's bill split method
 *        type:
 *          type: string
 *          description: The customer's type
 *      example:
 *        first_name: David
 *        last_name: DuChovni
 *        email: david_duchovni@example.com
 *        phone_number: +235 965854625
 *        address: 15 rue du fevre
 *        city: paris
 *        favorite_food: 7dc36efb-0533-4d9f-b4fb-62f757c08b3a
 *        favorite_drink: 7dc36efb-0533-4d9f-b4fb-62f757c08b3a
 *        bill_split: 'PER GROUP'
 *        type: 'IN TOWN'
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    SearchCustomer:
 *      type: object
 *      required:
 *        - fullname
 *        - type
 *      properties:
 *        fullname:
 *          type: string
 *          description: The customer's fullname
 *        type:
 *          type: string
 *          description: The customer's type
 *      example:
 *        fullname: David
 *        type: 'IN TOWN'
 */

/**
 * @swagger
 * tags:
 *  name: Customer
 *  description: The customers managing APi
 */

/**
 * @swagger
 * /api/v1/customer?page=:
 *  get:
 *    summary: returns the list of all customers
 *    tags: [Customer]
 *    parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *        required: false
 *        description: the pagination page
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
  * /api/v1/customer/{reference}:
  *  get:
  *    summary: get the customer by id
  *    tags: [Customer]
  *    parameters:
  *      - in: path
  *        name: reference
  *        schema:
  *          type: string
  *        required: true
  *        description: the customer reference
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
router.get(`/${prefix}/:reference`, CustomerController.edit)

/**
  * @swagger
  * /api/v1/customer/{reference}:
  *  patch:
  *    summary: update the customer by reference
  *    tags: [Customer]
  *    parameters:
  *      - in: path
  *        name: reference
  *        schema:
  *          type: string
  *        required: true
  *        description: the customer reference
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
router.patch(`/${prefix}/:reference`, CustomerController.update)

/**
 * @swagger
 * /api/v1/customer/findByName:
 *  post:
 *    summary: find a customer by name and type
 *    tags: [Customer]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/SearchCustomer'
 *    responses:
 *      200:
 *        description: the new customer
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SearchCustomer'
 *      500:
 *        description: Server Error
 */
router.post(`/${prefix}/findByName`, CustomerController.findByName)

/**
  * @swagger
  * /api/v1/customer/{reference}:
  *  delete:
  *    summary: delete the customer by reference
  *    tags: [Customer]
  *    parameters:
  *      - in: path
  *        name: reference
  *        schema:
  *          type: string
  *        required: true
  *        description: the customer reference
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
router.delete(`/${prefix}/:reference`, CustomerController.destroy)

module.exports = router
