const { Users } = require('../../models')
const { catchAsync, signToken } = require('../../utils')

exports.register = catchAsync(async (req, res) => {
    const newUserData = req.body
  
    const newUser = await Users.create(newUserData)

    const token = signToken(newUser.id)

    newUser.token = token

    await newUser.save()

  res.status(201).json({
    user: {
      name: newUser.name,
    },
    token,
    isNewUser: true
  })
})