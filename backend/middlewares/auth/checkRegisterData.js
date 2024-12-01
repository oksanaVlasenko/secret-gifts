const { catchAsync, AppError } = require('../../utils')
const { User } = require('../../models')

exports.checkRegisterData = catchAsync(async (req, res, next) => {
  console.log(req.body, ' req')
  const { email } = req.body; // Отримуємо email із req.body

  // Перевірка чи існує користувач з таким email
  const userExists = await User.exists({ email });

    if (userExists) throw new AppError(409, 'User with this email already exists')
  
    //req.body = value
  
    next()
  })