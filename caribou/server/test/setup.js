//loading external resources
require('dotenv').config();
const { expect } = require('chai')
const supertest = require('supertest')

global.expect = expect
global.supertest = supertest