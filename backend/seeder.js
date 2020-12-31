import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    // DESTROY everything in DB
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    // import Users from users.js
    const createdUsers = await User.insertMany(users)

    // get Admin User
    const adminUser = createdUsers[0]._id

    // link the Admin User to each Product in product.js
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    // import Products from products.js
    await Product.insertMany(sampleProducts)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (err) {
    console.error(err.message.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    // DESTROY everything in DB
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (err) {
    console.error(err.message.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  // $ node backend/seeder -d
  destroyData()
} else {
  // $ node backend/seeder
  importData()
}
