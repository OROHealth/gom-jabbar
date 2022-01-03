const ManagerController = require('../../controllers/ManagerController')
// const asyncTryCatchMiddleware = require('./root').asyncTryCatchMiddleware
const router = require('express').Router()
const prefix = 'manager'

/**
 * @swagger
 * components:
 *  schemas:
 *    EndPointResponse:
 *      type: object
 *      required:
 *        - status
 *        - data
 *        - error
 *        - msg
 *      properties:
 *        status:
 *          type: integer
 *          description: The endpoint response's status
 *        data:
 *          type: object
 *          description: the endpoint response's result
 *        error:
 *          type: object
 *          description: The endpoint response's error
 *        msg:
 *          type: string
 *          description: The endpoint response's message
 *      example:
 *        status: 400
 *        data: {}
 *        error: {}
 *        msg: the endpoint response's message
 */

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
 * components:
 *  schemas:
 *    Diagnose:
 *      type: object
 *      required:
 *        - over_cooked_level
 *        - server_name
 *        - month
 *      properties:
 *        server_name:
 *          type: string
 *          description: the waiter or waitress's name
 *        month:
 *          type: integer
 *          description: the number of months earlier from the current date
 *        over_cooked_level:
 *          type: string
 *          description: ordered dishes quantity
 *          enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 *      example:
 *        server_name: magally the waitress
 *        month: 5
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
 *              $ref: '#/components/schemas/EndPointResponse'
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
  *              $ref: '#/components/schemas/EndPointResponse'
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
 *              $ref: '#/components/schemas/EndPointResponse'
 *      500:
 *        description: Server Error
 */
router.post(`/${prefix}/:reference/order`, ManagerController.order)

/**
 * @swagger
 * /api/v1/manager/diagnose:
 *  post:
 *    summary: server diagnostic
 *    tags: [Manager]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Diagnose'
 *            require:
 *              -  server_name
 *              -  over_cooked_level
 *              -  month
 *    responses:
 *      200:
 *        description: ordered dishes
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/EndPointResponse'
 *      500:
 *        description: Server Error
 */
router.post(`/${prefix}/diagnose`, ManagerController.serverOverCookedDishes)

module.exports = router
