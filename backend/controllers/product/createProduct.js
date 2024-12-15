const { Product } = require('../../models')
const { catchAsync } = require('../../utils')

exports.createProduct = catchAsync(async (req, res) => {
  const newProductData = req.body.data

  newProductData.userId = req.userId
  
  const newProduct = await Product.create(newProductData)

  res.status(201).json(newProduct)
})