require('dotenv').config()
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const tokenExtractor = require('./utils/tokenExtractor')


const mongoUrl = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGO_URL
    : process.env.MONGO_URL
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.use(tokenExtractor)


app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}

module.exports = app

