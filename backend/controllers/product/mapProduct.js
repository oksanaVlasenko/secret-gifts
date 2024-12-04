const { AppError, catchAsync } = require('../../utils')

exports.mapProduct = catchAsync((req, res) => {
  console.log(req.body, ' data')
  const { productData } = req.body;

  if (!productData) {
    return res.status(400).json({ message: 'No product data available' });
  }

  res.status(200).json({
    title: productData.title,
    price: productData.price,
    images: productData.images
  });
})