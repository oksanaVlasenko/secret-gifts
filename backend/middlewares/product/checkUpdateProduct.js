const { catchAsync, AppError } = require('../../utils')
const { Product } = require('../../models')

exports.checkUpdateProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params; 

  const product = await Product.findById(id);

  if (!product) {
    throw new AppError(404, 'Product not found');
  }

  req.product = product;

  next()
})