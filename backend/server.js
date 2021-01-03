import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

// Uses the .env file
dotenv.config()

// Connect to Database
connectDB()

// Create Express App
const app = express()

app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.send('API is running')
})

app.use('/api/v1/products', productRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/orders', orderRoutes)

// PayPal Config Route
app.get('/api/v1/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

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
