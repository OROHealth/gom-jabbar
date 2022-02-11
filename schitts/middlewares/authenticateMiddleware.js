const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
  // use this middleware to define your common route logic

  try {
    const authHeader = req.headers.authorization

    // ['bearer', 'token']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
      res.status(403)
      next('No Token were found, Forbidden')
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          res.status(401)
          throw new Error('Token expired')
        }
        res.status(403)
        throw err
      }
      console.log(user)
      req.Auth = user
      next()
    })
    // return res.send('You were stopped here because middleware is blocking')
  } catch (e) {
    next(e)
  }
}
