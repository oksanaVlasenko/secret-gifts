const { Category } = require('../../models')
const { catchAsync, AppError } = require('../../utils')

exports.createCategory = catchAsync(async (req, res) => {
  const newCategoryData = req.body

  newCategoryData.userId = req.userId
  
  const newCategory = await Category.create(newCategoryData)

  res.status(201).json(newCategory)
})