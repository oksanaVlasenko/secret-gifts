const { catchAsync } = require('../../utils')

exports.getUserAvatar = catchAsync(async (req, res) => {
  const { user } = req

  res.status(200).json({
    user: {
      avatarURL: user.avatarURL,
    }
  })
})