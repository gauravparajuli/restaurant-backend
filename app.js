import express from 'express'
import bodyParser from 'body-parser'
import { createClient } from 'redis'
import mongoose from 'mongoose'

const PORT = 3001
const REDIS_PORT = 6379

// setup and connect to redis
const redisClient = createClient(REDIS_PORT)
await redisClient.connect()

const app = express()

// register middlewares here
app.use(bodyParser)

// error handling middleware
app.use((err, req, res, next) => {})

app.listen(PORT, () => {
    console.log(`Express server running at port:${PORT}`)
})
