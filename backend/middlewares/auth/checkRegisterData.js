const { catchAsync, AppError } = require('../../utils')
const { User } = require('../../models')

exports.checkRegisterData = catchAsync(async (req, res, next) => {
  const { email } = req.body; 

  const userExists = await User.exists({ email });

    if (userExists) throw new AppError(409, 'User with this email already exists')
    
    next()
  })