const express = require('express');
const AuthService = require('./auth-service');

const authRouter = express.Router();
const jsonBodyParser = express.json();

authRouter
  .post('/login', jsonBodyParser, (req, res, next) => {

    const {
      userName,
      password
    } = req.body
    const loginUser = {
      userName,
      password
    }

    for (const [key, value] of Object.entries(loginUser))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })
    AuthService.getUserWithUserName(
      req.app.get('db'),
      loginUser.userName
    )
      .then(dbUser => {
        console.log('dbUser:', dbUser)
        if (!dbUser)
          return res.status(400).json({
            error: 'Incorrect email or password',
          })
        return AuthService.comparePasswords(loginUser.password, dbUser.password)
          .then(compareMatch => {
            console.log('compareMatch:', compareMatch)
            if (!compareMatch)
              return res.status(400).json({
                error: 'Incorrect email or password',
              })

            const sub = dbUser.email
            const payload = {
              user_id: dbUser.id
            }
            console.log("dbUser:", dbUser)
            console.log('sub:', sub)
            console.log("payload:", payload)
            res.send({
              authToken: AuthService.createJwt(sub, payload),
              userId: dbUser.id
            })
          })
      })
      .catch(next)
  })

module.exports = authRouter;