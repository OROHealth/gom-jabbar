// load .env variables
require('dotenv').config({ path: '.env' })
require('./schitts/core/utils')
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 8080
const root = require('./schitts/routes/root')
const path = require('path')
const pkg = require('get-current-line').default // get current script filename and line
const log4js = require('./schitts/config/log4js')
var log = log4js.getLogger('app') // enable logging
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const logErrorMiddleware = require('./schitts/middlewares/logErrorMiddleware')
const cron = require('node-cron')
const shell = require('shelljs')
const { isTrue } = require('./schitts/helpers/helpers')

// import utils
const whiteList = [`${process.env.APP_URL}:${port}`, `http://127.0.0.1:${port}`, 'http://www.yoursite.com']
const swaggerOptions = {
  explorer: true,
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'Express Library API',
      contact: {
        name: 'Nkodo Mbe Jean Yves'
      }
    },
    server: [
      {
        url: whiteList[0]
      }
    ]
  },
  // api definition
  apis: ['./schitts/routes/api/*.js']
}

const specs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

var corsOptions = {
  origin: (_origin, callback) => { // _origin is the allowed client address
    if (whiteList.indexOf(_origin) !== -1 || !_origin) {
      callback(null, true)
    } else {
      callback(new Error(`address ${_origin} is not allowed by cors`))
    }
  },
  optionsSuccessStatus: 200
}

// To backup a database
if (isTrue(process.env.APP_BACKUP)) {
  cron.schedule('* */24 * * *', function () {
    console.log('---------------------')
    console.log('Running Database Backup Cron Job every day at midnight')
    const command = 'node schitts/recovery/backup.js'
    // const command = 'node schitts/recovery/restore.js'
    if (shell.exec(command).code !== 0) {
      shell.exit(1)
    } else {
      shell.echo('Database Backup Cron Job complete')
    }
  })
}

/* middlewares */
app.use(cors(corsOptions))

// built-in middleware to handle urlencoded data (x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }))
// built-in middleware to handle json data (x-www-form-urlencoded)
app.use(express.json())

// Routing Handler
app.use('/api', root)
/* Middleware */

process.on('uncaughtException', (err) => {
  console.log('whoops! there was an uncaughtException' + err)
  log.error(`${err} | ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
})

process.on('UnhandledPromiseRejectionWarning', (err) => {
  console.log('whoops! there was an UnhandledPromiseRejectionWarning' + err)
  log.error(`${err} | ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
})

// log Application error
app.use(logErrorMiddleware)

app.get('/', (req, res) => {
  res.json({ message: 'Welcome in our NodeJS Api template' })
})

// Handling wildcard
app.get('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
    res.json({ error: '404 Not Found' })
    // res.senFile(path.join(__dirname, 'link to 404.html'))
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found' })
  } else {
    res.type('txt').send('404 Not Found')
  }
})

// An error handling middleware
app.use((error, req, res, next) => {
  // Error gets here
  res.json({
    message: error.message
  })
})

app.listen(port, () => {
  console.log('server running at port ' + port)
})
