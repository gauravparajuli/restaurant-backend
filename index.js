import app from './app.js'
import mongoose from 'mongoose'

const PORT = process.env.PORT || 5000

mongoose.connect('mongodb://localhost:27017/restaurant-backend').then(() => {
    console.log('.: connected to database :.')
    app.listen(PORT, () => {
        console.log(`.: express server running at port ${PORT} :.`)
    })
})
