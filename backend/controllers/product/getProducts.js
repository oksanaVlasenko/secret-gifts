const { Product } = require('../../models')
const { catchAsync, createFilters } = require('../../utils')


exports.getProducts = catchAsync(async (req, res) => {
  const userId = req.userId

  let { categories, minPrice, maxPrice, searchText } = req.query;

  categories = categories ? categories.map(item => item === 'null' ? null : item) : [];

  const filters = createFilters({ userId, categories, minPrice, maxPrice, searchText })

  const productsData = await Product.find(filters);

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