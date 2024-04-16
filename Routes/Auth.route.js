const express = require('express')
const router = express.Router()
const AuthController = require('../Controllers/Auth.Controller')

router.post('/register', AuthController.register)

router.post('/login', AuthController.login)

router.post('/sendOTP',AuthController.sendOTP)

module.exports = router
