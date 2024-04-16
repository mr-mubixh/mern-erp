const createError = require('http-errors')
const User = require('../Models/User.model')
const { authSchema } = require('../helpers/validation_schema')
const {signAccessToken} = require('../helpers/jwt_helper')

module.exports = {
  register: async (req, res, next) => {
    try {
      // const { email, password } = req.body
      console.log('im on 17');
      const result = await authSchema.validateAsync(req.body)
      console.log('im on 19');
      const doesExist = await User.findOne({ email: result.email })
      if (doesExist) {
        throw createError.Conflict(`${result.email} is already been registered`)
      }
      console.log('im on 24');

      const user = new User(result)
      console.log('im on 27',user);

      const savedUser = await user.save()
      console.log('im on 30',savedUser);

      const accessToken = await signAccessToken(savedUser.id)
      console.log('im on 33',accessToken);

      res.send({ accessToken })
    } catch (error) {
      if (error.isJoi === true) error.status = 422
      next(error)
    }
  },

  login: async (req, res, next) => {
    try {
      const result = await authSchema.validateAsync(req.body)
      const user = await User.findOne({ email: result.email })
      if (!user) throw createError.NotFound('User not registered')

      const isMatch = await user.isValidPassword(result.password)
      if (!isMatch)
        throw createError.Unauthorized('Username/password not valid')

      const accessToken = await signAccessToken(user.id)

      res.send({ accessToken })
    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest('Invalid Username/Password'))
      next(error)
    }
  },
}
