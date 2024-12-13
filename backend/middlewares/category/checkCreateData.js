const { catchAsync, AppError } = require('../../utils')
const { Category } = require('../../models')

exports.checkCreateCategoryData = catchAsync(async (req, res, next) => {
  const { name } = req.body

  const categoryExists = await Category.exists({
    name: { $regex: `^${name.trim()}$`, $options: 'i' },
  });

  if (categoryExists) throw new AppError(409, 'Category with this name already exists')
    
  next()
})