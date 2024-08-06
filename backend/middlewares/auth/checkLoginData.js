const { catchAsync, AppError } = require('../../utils')
const { Users } = require('../../models')

exports.checkLoginData = catchAsync(async (req, res, next) => {  
    const userExists = await Users.exists({ email: value.email })
  
    if (!userExists) throw new AppError(401, 'Email or password is wrong')
  
    req.body = value
  
    next()
  })