const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
require('dotenv').config()
require('./helpers/init_mongodb')
const { verifyAccessToken, signAccessToken} = require('./helpers/jwt_helper')

const AuthRoute = require('./Routes/Auth.route')
const User = require("./Models/User.model");

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/dashboard', verifyAccessToken, async (req, res, next) => {
  const user = await User.findOne({ _id: req.payload.aud })
  let firstName = 'Customer';
  if (user.email.includes('.')) {
    firstName = user.email.split('@')[0].split('.')[0];
    firstName = `${firstName.charAt(0).toUpperCase() + firstName.slice(1)}`;
  }
  res.send(`Hello ${firstName}, Welcome to dashboard`);
})

app.get('/', async (req, res, next) => {
  res.send(`Hello , Please login to connect to us`);
})



app.use('/auth', AuthRoute)

app.use(async (req, res, next) => {
  next(createError.NotFound())
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
