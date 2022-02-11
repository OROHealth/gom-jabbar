const CustomerController = require('../../controllers/api/CustomerController')
// const asyncTryCatchMiddleware = require('./root').asyncTryCatchMiddleware
const router = require('express').Router()
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * security:
 *   - bearerAuth: []
 */

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
 *    security:
 *      - bearerAuth: []
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
 *              $ref: '#/components/schemas/EndPointResponse'
 */
router.get('/', CustomerController.index)

/**
 * @swagger
 * /api/v1/customer:
 *  post:
 *    summary: store a new customer
 *    security:
 *      - bearerAuth: []
 *    tags: [Customer]
 *    requestBody:
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: '#/components/schemas/Customer'
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              first_name:
 *                type: string
 *              last_name:
 *                type: string
 *              email:
 *                type: string
 *              phone_number:
 *                type: string
 *              address:
 *                type: string
 *              city:
 *                type: string
 *              favorite_food:
 *                type: string
 *              favorite_drink:
 *                type: string
 *              bill_split:
 *                type: string
 *              type:
 *                type: string
 *            required:
 *              - email
 *              - password
 *          examples:
 *              value:
 *                first_name: David
 *                last_name: DuChovni
 *                email: david_duchovni@example.com
 *                phone_number: +235 965854625
 *                address: 15 rue du fevre
 *                city: paris
 *                favorite_food: 7dc36efb-0533-4d9f-b4fb-62f757c08b3a
 *                favorite_drink: 7dc36efb-0533-4d9f-b4fb-62f757c08b3a
 *                bill_split: 'PER GROUP'
 *                type: 'IN TOWN'
 *    responses:
 *      200:
 *        description: the new customer
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/EndPointResponse'
 *      500:
 *        description: Server Error
 */
router.post('/', CustomerController.store)

/**
  * @swagger
  * /api/v1/customer/{reference}:
  *  get:
  *    summary: get the customer by id
  *    security:
  *      - bearerAuth: []
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
  *              $ref: '#/components/schemas/EndPointResponse'
  *      404:
  *        description: The customer was not found
  */
router.get('/:reference', CustomerController.edit)

/**
  * @swagger
  * /api/v1/customer/{reference}:
  *  patch:
  *    summary: update the customer by reference
  *    security:
  *      - bearerAuth: []
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
  *        application/x-www-form-urlencoded:
  *          schema:
  *            $ref: '#/components/schemas/Customer'
  *        application/json:
  *          schema:
  *            $ref: '#/components/schemas/Customer'
  *    responses:
  *      200:
  *        description: The updated customer
  *        contens:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/EndPointResponse'
  *      404:
  *        description: The customer was not found
  */
router.patch('/:reference', CustomerController.update)

/**
 * @swagger
 * /api/v1/customer/findByName:
 *  post:
 *    summary: find a customer by name and type
 *    security:
 *      - bearerAuth: []
 *    tags: [Customer]
 *    requestBody:
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: '#/components/schemas/SearchCustomer'
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/SearchCustomer'
 *    responses:
 *      200:
 *        description: the new customer
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/EndPointResponse'
 *      500:
 *        description: Server Error
 */
router.post('/findByName', CustomerController.findByName)

/**
  * @swagger
  * /api/v1/customer/{reference}:
  *  delete:
  *    summary: delete the customer by reference
  *    security:
  *      - bearerAuth: []
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
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/EndPointResponse'
  *      404:
  *        description: The customer was not found
  */
router.delete('/:reference', CustomerController.destroy)

module.exports = router
