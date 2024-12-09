const { AppError, catchAsync } = require('../../utils')
const { Product } = require('../../models')

exports.deleteProduct = catchAsync(async (req, res) => {
    const { id } = req.body

    const product = await Product.findById(id)
      
    if (!product) throw new AppError(404, 'Product not found')
  
    await Product.findByIdAndDelete(id)

    res.status(200).json({ message: 'Product successfully deleted' })
  })