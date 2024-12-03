const { catchAsync } = require('../../utils')

exports.updateAvatar = catchAsync(async (req, res) => {
  const { user } = req

  Object.keys(req.body).forEach((key) => {
    user[key] = req.body[key]
  })

  await user.save()
  
  res.status(200).json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      birthday: user.birthday,
      coverURL: user.coverURL,
      avatarURL: user.avatarURL,
    }
  })
})