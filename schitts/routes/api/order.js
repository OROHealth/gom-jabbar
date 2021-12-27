const OrderController = require('../../controllers/OrderController')
// const asyncTryCatchMiddleware = require('./root').asyncTryCatchMiddleware
const router = require('express').Router()
const prefix = 'order'

/**
 * @swagger
 * components:
 *  schemas:
 *    Order:
 *      type: object
 *      required:
 *        - order_date
 *        - tone
 *        - CustomerId
 *      properties:
 *        id:
 *          type: integer
 *          description: The auto-generated id of the order
 *        order_date:
 *          type: string
 *          description: The order's date
 *        reference:
 *          type: string
 *          description: The order's reference
 *        tone:
 *          type: string
 *          description: The tone at which the order was passed
 *          enum: [angry, happy, overhelmed, pregnant, moody, bored, excited]
 *        CustomerId:
 *          type: string
 *          description: The customer id
 *        party_size:
 *          type: integer
 *          description: The involved customers count regarding order
 *        feedback:
 *          type: integer
 *          description: The involved customers feedback
 *        status:
 *          type: string
 *          description: The order status
 *          enum: [PAID, UNPAID, REJECTED, ACCEPTED]
 *        customers:
 *          type: array
 *          description: The involved customers reference number
 *          items:
 *            type: string
 *            example: [7dc36efb-0533-4d9f-b4fb-62f757c08b3a, 7dc36efb-0533-4d9f-b4fb-62f757c08b3a]
 *      example:
 *        order_date: 1982-05-06
 *        tone: happy
 *        status: ACCEPTED
 *        feedback: your feedback
 *        CustomerId: 7dc36efb-0533-4d9f-b4fb-62f757c08b3a
 *        customers: ["7dc36efb-0533-4d9f-b4fb-62f757c08b3a", "7dc36efb-0533-4d9f-b4fb-62f757c08b3a"]
 */

/**
 * @swagger
 * tags:
 *  name: Order
 *  description: The orders managing APi
 */

/**
 * @swagger
 * /api/v1/order?page=:
 *  get:
 *    summary: returns the list of all orders
 *    tags: [Order]
 *    parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *        required: false
 *        description: the pagination page
 *    responses:
 *      200:
 *        description: the orders's list
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Order'
 */
router.get(`/${prefix}`, OrderController.index)

/**
 * @swagger
 * /api/v1/order:
 *  post:
 *    summary: store a new order
 *    tags: [Order]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Order'
 *    responses:
 *      200:
 *        description: the new order
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Order'
 *      500:
 *        description: Server Error
 */
router.post(`/${prefix}`, OrderController.store)

/**
  * @swagger
  * /api/v1/order/{reference}:
  *  get:
  *    summary: get the order by reference
  *    tags: [Order]
  *    parameters:
  *      - in: path
  *        name: reference
  *        schema:
  *          type: string
  *        required: true
  *        description: the order reference
  *    responses:
  *      200:
  *        description: fetch order by reference
  *        contens:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/Order'
  *      404:
  *        description: The order was not found
  */
router.get(`/${prefix}/:reference`, OrderController.edit)

/**
  * @swagger
  * /api/v1/order/{reference}:
  *  patch:
  *    summary: update the order by reference
  *    tags: [Order]
  *    parameters:
  *      - in: path
  *        name: reference
  *        schema:
  *          type: string
  *        required: true
  *        description: the order's reference
  *    requestBody:
  *      required: true
  *      content:
  *        application/json:
  *          schema:
  *            $ref: '#/components/schemas/Order'
  *    responses:
  *      200:
  *        description: The updated order
  *        contens:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/Order'
  *      404:
  *        description: The order was not found
  */
router.patch(`/${prefix}/:reference`, OrderController.update)

/**
  * @swagger
  * /api/v1/order/{reference}:
  *  delete:
  *    summary: delete the order by reference
  *    tags: [Order]
  *    parameters:
  *      - in: path
  *        name: reference
  *        schema:
  *          type: string
  *        required: true
  *        description: the order's reference
  *    responses:
  *      200:
  *        description: the order description by reference
  *        contens:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/Order'
  *      404:
  *        description: The order was not found
  */
router.delete(`/${prefix}/:reference`, OrderController.destroy)

module.exports = router
