const { catchAsync, AppError } = require('../../utils')
const { User } = require('../../models')

exports.checkLoginData = catchAsync(async (req, res, next) => {  
    const { email } = req.body;
    
    const userExists = await User.exists({ email: email })
  
    if (!userExists) throw new AppError(401, 'Email or password is wrong')
  
    //req.body = value
  
    next()
  })