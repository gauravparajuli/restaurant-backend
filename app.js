import express from 'express'
import bodyParser from 'body-parser'
import { createClient } from 'redis'

import orgInfoRoutes from './routes/organization-info-routes.js'
import departRoutes from './routes/department-routes.js'
import catRoutes from './routes/food-category-routes.js'
import tableRoutes from './routes/table-routes.js'

const REDIS_PORT = process.env.REDIS_PORT || 6379

// setup, connect and export redis
export const redisClient = createClient(REDIS_PORT)

const app = express()

// register middlewares here
app.use(bodyParser.json())

// register routes here
app.use('/org', orgInfoRoutes)
app.use('/depart', departRoutes)
app.use('/cat', catRoutes)
app.use('/table', tableRoutes)

// error handling middleware
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json(err)
    next()
})

export default app
