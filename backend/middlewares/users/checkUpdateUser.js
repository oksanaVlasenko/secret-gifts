//const { updateUserDataValidator } = require('../../services/users')
const { catchAsync, AppError, checkDate } = require('../../utils')
const { User } = require('../../models')

exports.checkUpdateData = catchAsync(async (req, res, next) => {
  // const { error, value } = updateUserDataValidator(req.body)

  // if (error) throw new AppError(400, error.message)

  const { birthday, email } = req.body

  const userExists = await User.findOne({ email });

  if (userExists && userExists._id.toString() !== req.user._id.toString()) {
    throw new AppError(409, 'User with this email already exists');
  }

  if (!checkDate(birthday)) throw new AppError(400, "The birthday couldn't be in future")

  next()
})