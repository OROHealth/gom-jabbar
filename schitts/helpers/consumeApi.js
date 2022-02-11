const log4js = require('../config/log4js')
const log = log4js.getLogger('app') // enable logging
const pkg = require('get-current-line').default // get current script filename and line
const apiEndPoint = `http://localhost:${process.env.PORT}/api/v1`
const fetch = require('node-fetch')
const options = {
  // These properties are part of the Fetch Standard
  method: 'GET',
  headers: {}, // Request headers. format is the identical to that accepted by the Headers constructor (see below)
  body: null // Request body. can be null, or a Node.js Readable stream
  // redirect: 'follow', // Set to `manual` to extract redirect headers, `error` to reject redirect
  // signal: null, // Pass an instance of AbortSignal to optionally abort requests

  // The following properties are node-fetch extensions
  // follow: 20, // maximum redirect count. 0 to not follow redirect
  // compress: true, // support gzip/deflate content encoding. false to disable
  // size: 0, // maximum response body size in bytes. 0 to disable
  // agent: null, // http(s).Agent instance or function that returns an instance (see below)
  // highWaterMark: 16384, // the maximum number of bytes to store in the internal buffer before ceasing to read from the underlying resource.
  // insecureHTTPParser: false // Use an insecure HTTP parser that accepts invalid HTTP headers when `true`.
}

const GET = async (path = null) => {
  let json = {}
  try {
    const response = await fetch(`${apiEndPoint}/${path}`)
    json = await response.json()
  } catch (error) {
    log.error(`An error occured:${error}. EndPoint: ${apiEndPoint}/${path} ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
  }
  return json
}

// Post with JSON
const POST = async (path = null, body = {}) => {
  let json = {}
  try {
    options.headers = { 'content-type': 'application/json' }
    options.method = 'post'
    options.body = JSON.stringify(body)
    const response = await fetch(`${apiEndPoint}/${path}`, options)
    json = await response.json()
  } catch (error) {
    log.error(`An error occured:${error}. EndPoint: ${apiEndPoint}/${path} ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
  }
  return json
}

// Post with form parameters
// The Content-Type header is only set automatically to x-www-form-urlencoded when an instance of URLSearchParams is given as such:
// Not finished
const POST_FORM_DATA = async (path = null, formData = {}) => {
  const params = new URLSearchParams()
  params.append('a', 1) // a = formData['some_member']
  let json = {}
  try {
    options.headers = { 'content-type': 'application/json' }
    options.method = 'post'
    options.body = params
    const response = await fetch(`${apiEndPoint}/${path}`, options)
    json = await response.json()
  } catch (error) {
    log.error(`An error occured:${error}. EndPoint: ${apiEndPoint}/${path} ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
  }
  return json
}

const PATCH = async (path = null, body = {}) => {
  let json = {}
  try {
    options.headers = { 'content-type': 'application/json' }
    options.method = 'patch'
    options.body = JSON.stringify(body)
    const response = await fetch(`${apiEndPoint}/${path}`, options)
    json = await response.json()
  } catch (error) {
    log.error(`An error occured:${error}. EndPoint: ${apiEndPoint}/${path} ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
  }
  return json
}

const DELETE = async (path = null) => {
  let json = {}
  try {
    options.headers = { 'content-type': 'application/json' }
    options.method = 'delete'
    const response = await fetch(`${apiEndPoint}/${path}`, options)
    json = await response.json()
  } catch (error) {
    log.error(`An error occured:${error}. EndPoint: ${apiEndPoint}/${path} ${path.basename(pkg().file, '.js')}@${pkg().method}:${pkg().line}`)
  }
  return json
}

module.exports = {
  GET,
  POST,
  PATCH,
  DELETE
}
