module.exports = (req, res, next) => {
  // use this middleware to define your common route logic
  try {
    // res.status(400).json({ status: 'success' })
    console.log('Middleware reached!')
    // pass a value between middleware and next handler
    // req.paramName = 'value'
    next()
    // return res.send('You were stopped here because middleware is blocking')
  } catch (e) {
    console.log(e)
    next(e) // res.status(401).send('Middleware blocking')
  }
}
