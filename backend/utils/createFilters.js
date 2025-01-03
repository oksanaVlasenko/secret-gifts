exports.createFilters = ({ userId, categories, minPrice, maxPrice, searchText }) => {
  const filters = {
    userId,
  };

  if (categories && categories.length > 0) {
    filters.$or = categories.includes(null)
      ? [
          {
            $or: [
              { categoryId: { $in: categories.filter(id => id !== null) } },
              { categoryId: null },
              { categoryId: { $exists: false } },
            ],
          },
        ]
      : [{ categoryId: { $in: categories } }];
  }

  if (minPrice > 0 || maxPrice > 0) {
    filters.price = {};
    if (minPrice && minPrice > 0) filters.price.$gte = Number(minPrice);
    if (maxPrice && maxPrice > 0) filters.price.$lte = Number(maxPrice);
  }

  if (searchText && searchText.length > 1) {
    filters.title = { $regex: searchText, $options: 'i' }; 
  }

  return filters;
};
