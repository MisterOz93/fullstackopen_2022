require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const JWT_KEY = process.env.JWT_KEY

module.exports = { PORT, MONGODB_URI, JWT_KEY }
