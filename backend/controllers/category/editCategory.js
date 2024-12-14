const { catchAsync } = require('../../utils')

exports.editCategory = catchAsync(async (req, res) => {
  const { name } = req.body
  const { category } = req

  category.name = name

  await category.save()
  
  res.status(200).json(category)
})