const { catchAsync } = require('../../utils')

exports.saveImages = catchAsync(async (req, res) => {
  const { images } = req.body
  
  res.status(200).json(images)
})