const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3001
const Pool = require('pg').Pool
const pool = new Pool({
  host: 'postgres',
  port: 5432,
  user: 'admin',
  password: '123456',
  database: 'cafetropical',
})
app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({ extended: true })
)
  
app.set('router', express.Router());
app.set('pool',pool)
// Routes
app.get('/', (request, response) => {
  response.json({ info: 'It works!' })
}) 

app.use(require('./routes.js')(app)) 
// app.post('/addOrder', (request, response) => {
//   let q = 'SELECT * FROM customer ';
//   pool.query(q, (error, results) => {
//     if (error) { throw error }
//     response.status(200).json(results.rows)
//   })
// })
// app.post('/addCustomer', (request, response) => {
//   let q = 'SELECT * FROM customer ';
//   pool.query(q, (error, results) => {
//     if (error) { throw error }
//     response.status(200).json(results.rows)
//   })
// })

// app.post('/updateCustomer', (request, response) => {
//   let q = 'SELECT * FROM customer ';
//   pool.query(q, (error, results) => {
//     if (error) { throw error }
//     response.status(200).json(results.rows)
//   })
// })

// app.post('/addMenuItem', (request, response) => {
//   let q = 'SELECT * FROM customer ';
//   pool.query(q, (error, results) => {
//     if (error) { throw error }
//     response.status(200).json(results.rows)
//   })
// })

// app.post('/updateMenuItem', (request, response) => {
//   let q = 'SELECT * FROM customer ';
//   pool.query(q, (error, results) => {
//     if (error) { throw error }
//     response.status(200).json(results.rows)
//   })
// })

// app.get('/getMenuItemList', (request, response) => {
//   let q = 'SELECT * FROM customer ';
//   pool.query(q, (error, results) => {
//     if (error) { throw error }
//     response.status(200).json(results.rows)
//   })
// })

// app.get('/getOrderList', (request, response) => {
//   // let q = 'SELECT * FROM customer ';
//   // pool.query(q, (error, results) => {
//   //   if (error) { throw error }
//   //   response.status(200).json(results.rows)
//   // })
// })
 
  
app.listen(port, () => {
  console.log(`running on port ${port}.`)
})
