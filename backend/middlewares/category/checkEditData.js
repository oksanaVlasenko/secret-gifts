const { catchAsync, AppError } = require('../../utils')
const { Category } = require('../../models')

exports.checkEditData = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body

  const category = await Category.findById(id);

  if (!category) {
    throw new AppError(404, 'Category not found');
  }

  const categoryExists = await Category.exists({
    name: { $regex: `^${name.trim()}$`, $options: 'i' },
  });

  if (categoryExists && categoryExists._id.toString() !== id.toString()) throw new AppError(409, 'Category with this name already exists')

  req.category = category;

  next()
})