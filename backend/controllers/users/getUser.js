const { catchAsync } = require('../../utils')

exports.getUser = catchAsync(async (req, res) => {
  const { user } = req

  console.log(user)

  res.status(200).json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      birthday: user.birthday,
      avatarURL: user.avatarURL,
      coverURL: user.coverURL
    }
  })
})