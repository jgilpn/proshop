import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// @desc    Auth user & get token
// @route   POST /api/v1/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  // Check if user w/ email and password was found
  if (user && (await user.matchPassword(password))) {
    // Send back user data and token
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    // Otherwise 401 Error
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Register a new user
// @route   POST /api/v1/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  // If user already exists send 400 Error
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Create new user in DB
  const user = await User.create({
    name,
    email,
    password,
  })

  // Check if user was created
  if (user) {
    // Send back user data and token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    // Otherwise send 400 Error
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Get user profile
// @route   GET /api/v1/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  // Check if user exists
  if (user) {
    // Send back user data
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    // Otherwise send back 404 Error
    res.status(404)
    throw new Error('User Not Found')
  }
})

export { authUser, registerUser, getUserProfile }