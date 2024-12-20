const { Product } = require('../../models')
const { catchAsync } = require('../../utils')

exports.getProducts = catchAsync(async (req, res) => {
  const userId = req.userId
  let categories = req.query.categories 
  categories = categories ? categories.map(item => item === 'null' ? null : item) : [];

  const productsData = await Product.find({ 
    userId,
    ...(categories && categories.length > 0
      ? {
        $or: [
          categories.includes(null)
            ? { $or: [{ categoryId: { $in: categories.filter(id => id !== null) } }, { categoryId: null }, { categoryId: { $exists: false } }] }
            : { categoryId: { $in: categories } }
          ]
        }
      : {})
  });

  const products = productsData.map(p => {
    return {
      currency: p.currency,
      description: p.description,
      images: p.images,
      price: p.price,
      title: p.title,
      url: p.url,
      selected: p.selected,
      id: p._id,
      categoryId: p.categoryId
    }
  })
  
  res.status(200).json(products);
})