const { User } = require('../../models')
const { catchAsync, signToken } = require('../../utils')

exports.register = catchAsync(async (req, res) => {
    const newUserData = req.body
  
    const newUser = await User.create(newUserData)

    const token = signToken(newUser.id)

    newUser.token = token

    await newUser.save()

  res.status(201).json({
    name: newUser.name,
    id: newUser._id,
    email: newUser.email,
    token,
    isNewUser: true
  })
})