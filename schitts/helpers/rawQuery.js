
const db = require('../models/_index')
const { isEmptyObject } = require('./helpers')
class RawQuery {
  constructor (query = null) {
    this.db = db
    this.query = query
    this.params = {}
  }

  addParameter (parameterName, value) {
    this.params[parameterName] = value
    return this
  }

  addParameters (parameters) {
    if (!isEmptyObject(parameters)) {
      if (!isEmptyObject(this.params)) {
        this.params = { ...this.params, ...parameters }
      } else {
        this.params = { ...parameters }
      }
    }
    return this
  }

  async executeStatement () {
    return await this.db.sequelize.query(this.query, {
      replacements: this.params,
      type: this.db.sequelize.QueryTypes.RAW
    })
  }

  async runSelectStatement () {
    return await this.db.sequelize.query(this.query, {
      replacements: this.params,
      type: this.db.sequelize.QueryTypes.SELECT
    })
  }

  async runInsertStatement () {
    return await this.db.sequelize.query(this.query, {
      replacements: this.params,
      type: this.db.sequelize.QueryTypes.INSERT
    })
  }

  async runUpdateStatement () {
    return await this.db.sequelize.query(this.query, {
      replacements: this.params,
      type: this.db.sequelize.QueryTypes.UPDATE
    })
  }

  async runDeleteStatement () {
    return await this.db.sequelize.query(this.query, {
      replacements: this.params,
      type: this.db.sequelize.QueryTypes.DELETE
    })
  }
}

module.exports = RawQuery
