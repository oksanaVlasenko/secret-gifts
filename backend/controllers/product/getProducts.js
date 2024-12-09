const { Product } = require('../../models')
const { catchAsync } = require('../../utils')

exports.getProducts = catchAsync(async (req, res) => {
  const userId = req.userId

  const productsData = await Product.find({ userId });

  const products = productsData.map(p => {
    return {
      currency: p.currency,
      description: p.description,
      images: p.images,
      price: p.price,
      title: p.title,
      url: p.url,
      selected: p.selected,
      id: p._id
    }
  })
  
  res.status(200).json(products);
})