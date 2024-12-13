const { Category } = require('../../models')
const { catchAsync } = require('../../utils')

exports.getAllCategories = catchAsync(async (req, res) => {
  const userId = req.userId

  const categoriesData = await Category.find({ userId });

  // const categories = productsData.map(p => {
  //   return {
  //     currency: p.currency,
  //     description: p.description,
  //     images: p.images,
  //     price: p.price,
  //     title: p.title,
  //     url: p.url,
  //     selected: p.selected,
  //     id: p._id
  //   }
  // })
  
  res.status(200).json(categoriesData);
})