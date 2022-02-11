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
const isTrue = ($value) => ($value === 'true' || $value === true || $value === 1)

const pattern = /\d+/
/**
 * description check if value is a number
 * @param {$value} value
 * @returns boolean
 */
const isNumber = ($value) => (pattern.test($value))

/**
 * description generate a custom uuidV4
 * @returns string
 */
const generateUuidV4 = () => {
  return uuidv4()
}

const isUUID = ($value) => (uuidValidate($value) && uuidVersion === '4')

const randomBytes64 = () => require('crypto').randomBytes(64).toString('hex')

const isIterable = function (obj) {
  // checks for null and undefined
  if (obj === null || obj === undefined) {
    return false
  }
  return typeof obj[Symbol.iterator] === 'function' && Array.isArray(obj)
}

// check if an object has no menber, example {}
const isEmptyObject = (obj) => Object.entries(obj).length === 0

module.exports = { consoleLog, isTrue, generateUuidV4, isUUID, randomBytes64, isNumber, isIterable, isEmptyObject }
