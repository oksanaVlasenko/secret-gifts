const { mapProduct } = require('./mapProduct')
const { createProduct } = require('./createProduct')
const { getProducts } = require('./getProducts')
const { saveImages } = require('./saveImages')
const { deleteProduct } = require('./deleteProduct')
const { getProduct } = require('./getProduct')

module.exports = {
  mapProduct,
  createProduct,
  getProducts,
  saveImages,
  deleteProduct,
  getProduct
}