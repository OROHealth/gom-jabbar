const dbConfig = require('../config/dbConfig').development
const { Sequelize, DataTypes } = require('sequelize')
const path = require('path')
const fs = require('fs')
const { isTrue } = require('../helpers/helpers')
const log4js = require('../config/log4js')
const log = log4js.getLogger('app') // enable logging
const pkg = require('get-current-line').default // get current script filename and line
const dbSeed = require('../seed/dbSeeder')
const sequelize = new Sequelize(
  dbConfig.DATABASE,
  dbConfig.USER,
  dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
      min: dbConfig.pool.min,
      max: dbConfig.pool.max,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  }
)

sequelize.authenticate()
  .then(() => console.log('connected'))
  .catch(err => console.log('error ' + err))

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
db.limit = 10 // pagination
// table structure
/* db.Product = require('./Product.js')(sequelize, DataTypes) */

// instead of above [table structure codes] we do : under models folder we get all files and initialize model corresponding to each file
fs.readdirSync(path.join(__dirname)).forEach(file => {
  if (file !== '_index.js' && file !== '_connections.js') {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes)
    db[model.name] = model
  }
})

// load relation between models
require('./_connections')(db)

if (isTrue(process.env.APP_SYNC)) {
  db.sequelize.sync({ force: true }) // sync database everytime app is running, wipe all table and re-create
    .then(() => {
      console.log('Database synchronised successfully ')
      if (isTrue(process.env.APP_SEED)) {
        dbSeed(db)
      }
    }).catch(err => { // SequelizeValidationError
      log.error(`${err}. ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
      throw (err)
    })
}
// const RawQuery = require('../helpers/rawQueries')
// db.RawQuery = new RawQuery(db)
/* db.RAWSELECT = async (sql) => {
  return await db.sequelize.query(sql, {
    replacements: this.params,
    type: db.sequelize.QueryTypes.SELECT
  })
} */
module.exports = db
