const { AppError, catchAsync } = require('../../utils')
const { Product } = require('../../models')

exports.getProduct = catchAsync(async (req, res) => {
  const { id } = req.params

  const product = await Product.findById(id)
    
  if (!product) throw new AppError(404, 'Product not found')

  res.status(200).json(product)
})