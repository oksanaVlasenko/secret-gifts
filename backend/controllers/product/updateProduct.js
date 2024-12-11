const { catchAsync } = require('../../utils')
const { deleteOnCloudinary } = require('../../services/cloudinary')

exports.updateProduct = catchAsync(async (req, res) => {
  const { product } = req
  
  delete req.body.deletedImages
 
  Object.keys(req.body).forEach((key) => {
    product[key] = req.body[key]
  })

  await product.save()
  
  res.status(200).json(product)
})