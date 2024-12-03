const { AppError, catchAsync } = require('../../utils')
const { User } = require('../../models')
const bcrypt = require("bcrypt")

exports.changePassword = catchAsync(async (req, res) => {
  const { email, password, newPassword } = req.body

  const user = await User.findOne({ email }).select('+password')
  
  const passwordIsValid = await bcrypt.compare(password, user.password);

  if (!passwordIsValid) {
    throw new AppError(401, 'Email or password is wrong');
  }

  user.password = newPassword

  await user.save()

  res.status(200).json()
})