const { Category, Product } = require('../../models')
const { catchAsync } = require('../../utils')

exports.getAllCategories = catchAsync(async (req, res) => {
  const userId = req.userId

  const categoriesData = await Category.find({ userId }).lean();

  const categoryIds = categoriesData.map(category => category._id);

  const productCounts = await Product.aggregate([
    { $match: { categoryId: { $in: categoryIds } } }, 
    { $group: { _id: "$categoryId", count: { $sum: 1 } } } 
  ]);

  const countsMap = productCounts.reduce((acc, item) => {
    acc[item._id] = item.count;
    return acc;
  }, {});

  const categories = categoriesData.map(category => {
    return {
      ...category,
      productsCount: countsMap[category._id] || 0
    }
  })
  
  res.status(200).json(categories);
})