const { v4: uuidv4, validate: uuidValidate, version: uuidVersion } = require('uuid')

/**
 * description output into console
 * @param {$value} $value
 */
const consoleLog = ($value) => {
  if (process.env.DEBUG) {
    console.log($value)
  }
}

/**
 * description cast value into boolean
 * @param {$value} value
 * @returns boolean
 */
const isTrue = ($value) => ($value === 'true')

/**
 * description generate a custom uuidV4
 * @returns string
 */
const generateUuidV4 = () => {
  return uuidv4()
}

const isUUID = ($value) => (uuidValidate($value) && uuidVersion === '4')

const randomBytes64 = () => require('crypto').randomBytes(64).toString('hex')

module.exports = { consoleLog, isTrue, generateUuidV4, isUUID, randomBytes64 }
