import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import productRoutes from './routes/productRoutes.js'

// Uses the .env file
dotenv.config()

// Connect to Database
connectDB()

// Create Express App
const app = express()

// Routes
app.get('/', (req, res) => {
  res.send('API is running')
})

app.use('/api/v1/products', productRoutes)

// Error Middleware
app.use(notFound)

app.use(errorHandler)

// Run Server on specified port
const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(
    `Server listening in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
)
