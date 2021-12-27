const ManagerController = require('../../controllers/ManagerController')
// const asyncTryCatchMiddleware = require('./root').asyncTryCatchMiddleware
const router = require('express').Router()
const prefix = 'manager'

/**
 * @swagger
 * components:
 *  schemas:
 *    Booking:
 *      type: object
 *      required:
 *        - reservation_date
 *        - party_size
 *        - CustomerId
 *      properties:
 *        id:
 *          type: integer
 *          description: The auto-generated id of the booking
 *        reservation_date:
 *          type: string
 *          description: The booking's date
 *        reference:
 *          type: string
 *          description: The booking's reference
 *        CustomerId:
 *          type: string
 *          description: The customer id
 *      example:
 *        reservation_date: 1982-05-06
 *        party_size: 5
 *        customer_id: 7dc36efb-0533-4d9f-b4fb-62f757c08b3a
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    OrderedDishes:
 *      type: object
 *      required:
 *        - DishId
 *        - quantity
 *      properties:
 *        id:
 *          type: integer
 *          description: The auto-generated id of the ordered dish
 *        DishId:
 *          type: string
 *          description: The dish identifier
 *        OrderId:
 *          type: string
 *          description: The order's reference
 *        quantity:
 *          type: integer
 *          description: ordered dishes quantity
 *        over_cooked_level:
 *          type: string
 *          description: ordered dishes quantity
 *          enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 *      example:
 *        DishId: 7dc36efb-0533-4d9f-b4fb-62f757c08b3a
 *        quantity: 11
 *        over_cooked_level: 5
 */

/**
 * @swagger
 * tags:
 *  name: Manager
 *  description: The restaurant managing APi
 */

/**
 * @swagger
 * /api/v1/manager/booking:
 *  post:
 *    summary: book a customer
 *    tags: [Manager]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Booking'
 *    responses:
 *      200:
 *        description: the new booking
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Booking'
 *      500:
 *        description: Server Error
 */
router.post(`/${prefix}/booking`, ManagerController.store)

/**
  * @swagger
  * /api/v1/manager/booking/{reference}:
  *  patch:
  *    summary: update a booking by reference
  *    tags: [Manager]
  *    parameters:
  *      - in: path
  *        name: reference
  *        schema:
  *          type: string
  *        required: true
  *        description: the booking's reference
  *    requestBody:
  *      required: true
  *      content:
  *        application/json:
  *          schema:
  *            $ref: '#/components/schemas/Booking'
  *    responses:
  *      200:
  *        description: The updated booking
  *        contens:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/Booking'
  *      404:
  *        description: The manager was not found
  */
router.patch(`/${prefix}/booking/:reference`, ManagerController.update)

/**
 * @swagger
 * /api/v1/manager/{reference}/order:
 *  post:
 *    summary: order a dish
 *    tags: [Manager]
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
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/OrderedDishes'
 *            require:
 *              -  DishId
 *              -  quantity
 *    responses:
 *      200:
 *        description: ordered dishes
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/OrderedDishes'
 *      500:
 *        description: Server Error
 */
router.post(`/${prefix}/:reference/order`, ManagerController.order)

module.exports = router
