import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const router = express.Router()

// @desc    Fetch all products
// @route   GET /api/v1/products
// @access  Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({})

    res.json({ success: true, data: products })
  })
)

// @desc    Fetch one product by id
// @route   GET /api/v1/products/:id
// @access  Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
      res.json({ success: true, data: product })
    } else {
      res.status(404).json({ success: false, error: 'Product not found' })
    }
  })
)

export default router
