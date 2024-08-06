const { catchAsync, AppError } = require('../../utils')
const { Users } = require('../../models')

exports.checkRegisterData = catchAsync(async (req, res, next) => {
    const userExists = await Users.exists({ email: value.email })
  
    if (userExists) throw new AppError(409, 'User with this email already exists')
  
    req.body = value
  
    next()
  })