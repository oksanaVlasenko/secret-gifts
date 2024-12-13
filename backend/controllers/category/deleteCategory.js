const { AppError, catchAsync } = require('../../utils')
const { Category, Product } = require('../../models')

exports.deleteCategory = catchAsync(async (req, res) => {
  const { id } = req.body

  const category = await Category.findById(id)
    
  if (!category) throw new AppError(404, 'Category not found')

  const products = await Product.find({ categoryId: id });

  if (products.length > 0) {
    await Product.updateMany(
      { categoryId: id },
      { $set: { categoryId: null } } 
    );
  }

  await Category.findByIdAndDelete(id)

  res.status(200).json({ message: 'Product successfully deleted' })
})