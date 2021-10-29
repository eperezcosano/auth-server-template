require('dotenv').config()
const express = require('express')
const http = require('http')
const mongoose = require('mongoose')

const app = express()
const server = http.createServer(app)
const router = require('./routes/index')

app.use(express.json())
app.use('/', router)

mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to DB')
    }).catch(error => {
    console.error('Connection to DB Failed')
    console.error(error.message)
    process.exit(-1)
})

server.listen(process.env.PORT, 'localhost',() => {
    console.log(`Listening on http://localhost:${process.env.PORT}`)
})
