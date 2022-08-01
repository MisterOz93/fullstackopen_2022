const hardCodedBlogs = require('../utils/list_helper').blogs
const superTest = require('supertest')
const app = require('../app')
const api = superTest(app)

