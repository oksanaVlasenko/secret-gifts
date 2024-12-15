const { catchAsync } = require('../../utils')

exports.updateProduct = catchAsync(async (req, res) => {
  const { product } = req
  
  delete req.body.deletedImages
 
  Object.keys(req.body.data).forEach((key) => {
    product[key] = req.body.data[key]
  })

  await product.save()
  
  res.status(200).json(product)
})