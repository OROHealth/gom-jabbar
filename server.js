// load .env variables
require('dotenv').config({ path: '.env' })
require('./src/core/utils')
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 8080
const root = require('./src/routes/root')
const web = require('./src/routes/web')
const path = require('path')
const pkg = require('get-current-line').default // get current script filename and line
const log4js = require('./src/config/log4js')
const log = log4js.getLogger('app') // enable logging
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const logErrorMiddleware = require('./src/middlewares/logErrorMiddleware')
const cron = require('node-cron')
const shell = require('shelljs')
const { isTrue } = require('./src/helpers/helpers')
const os = require('os')
// const { default: cluster } = require('cluster')
const cluster = require('cluster')
const numCpu = os.cpus().length
// handlebars
const hbs = require('express-handlebars')
const cookieParser = require('cookie-parser')
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
  apis: ['./src/routes/api/*.js']
}

const specs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

const corsOptions = {
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
    const command = 'node src/recovery/backup.js'
    // const command = 'node src/recovery/restore.js'
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
app.use(express.urlencoded({ extended: false }))
// built-in middleware to handle json data (x-www-form-urlencoded)
app.use(express.json())
// Middleware for cookie
app.use(cookieParser())
// Set views directory and views engine as Handlebars using,
app.set('views', path.join(__dirname, './src/views'))
app.use('/asset', express.static(path.join(__dirname, './public'))) // access file using relative path href="/asset/your-doc-under-public-folder"

app.engine('handlebars', hbs.engine({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, './src/views/layouts/'),
  partialsDir: path.join(__dirname, './src/views/partials/')
}))
app.set('view engine', 'hbs')

// Routing Handler
app.use('/api', root)
app.use('/web', web)
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

// scale App
if (isTrue(process.env.APP_SCALE)) {
  if (cluster.isPrimary) {
    // fork worker
    console.log(`Primary ${process.pid} is running`)
    for (let index = 0; index < numCpu; index++) {
      cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`)
      cluster.fork()
    })
  } else {
    app.listen(port, () => {
      console.log(`Worker ${process.pid}. Server @ http://localhost:${port}`)
    })
  }
} else {
  app.listen(port, () => {
    console.log(`Worker ${process.pid}. Server @ http://localhost:${port}`)
  })
}
