const UserController = require('../../controllers/api/UserController')
// const asyncTryCatchMiddleware = require('./root').asyncTryCatchMiddleware
const router = require('express').Router()

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - first_name
 *        - last_name
 *        - email
 *        - password
 *        - reference
 *        - token (refresh token)
 *      properties:
 *        id:
 *          type: integer
 *          description: The auto-generated user identifier
 *        first_name:
 *          type: string
 *          description: The first name of user
 *        last_name:
 *          type: string
 *          description: the user's last name
 *        email:
 *          type: string
 *          description: knowing if product is published or not
 *        password:
 *          type: string
 *          description: The user's password
 *      example:
 *        first_name: David
 *        last_name: DuChovni
 *        email: david_duchovni@example.com
 *        password: yourPassword
 */

/**
 * @swagger
 * tags:
 *  name: user
 *  description: The users managing APi
 */

/**
 * @swagger
 * /api/v1/user?page=:
 *  get:
 *    summary: returns the list of all users
 *    tags: [user]
 *    parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *        required: false
 *        description: the pagination page
 *    responses:
 *      200:
 *        description: the list of the users
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/EndPointResponse'
 */
router.get('/', UserController.index)

/**
 * @swagger
 * /api/v1/user/signin:
 *  post:
 *    summary: generate a new token
 *    tags: [user]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *          examples:
 *            JohnDoe:
 *              value:
 *                email: your_email
 *                password: your_password
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *            required:
 *              - email
 *              - password
 *          examples:
 *            JohnDoe:
 *              value:
 *                email: your_email
 *                password: your_password
 *    responses:
 *      200:
 *        description: generate a new token
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/EndPointResponse'
 *      500:
 *        description: Server Error
 */
router.post('/signin', UserController.signIn)

/**
 * @swagger
 * /api/v1/user/signup:
 *  post:
 *    summary: create a new user
 *    tags: [user]
 *    requestBody:
 *      required: true
 *      content:
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
 *              password:
 *                type: string
 *            required:
 *              - email
 *              - password
 *          examples:
 *            JohnDoe:
 *              value:
 *                first_name: your_firstname
 *                last_name: your_firstname
 *                email: youremail@example.com
 *                password: your_password
 *    responses:
 *      200:
 *        description: create the new user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/EndPointResponse'
 *      500:
 *        description: Server Error
 */
router.post('/signup', UserController.signUp)

/**
 * @swagger
 * /api/v1/user/signup:
 *  post:
 *    summary: create a new user
 *    tags: [user]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: create the new user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/EndPointResponse'
 *      500:
 *        description: Server Error
 */
router.post('/logout', UserController.logout)

/**
 * @swagger
 * /api/v1/user/refresh:
 *  post:
 *    summary: refresh token
 *    tags: [user]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *          examples:
 *            JohnDoe:
 *              value:
 *                refreshToken: Your_refresh_token
 *    responses:
 *      200:
 *        description: refresh token
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/EndPointResponse'
 *      500:
 *        description: Server Error
 */
router.post('/refresh', UserController.refresh)

module.exports = router
