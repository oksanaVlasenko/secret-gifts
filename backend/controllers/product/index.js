const { mapProduct } = require('./mapProduct')
const { createProduct } = require('./createProduct')
const { getProducts } = require('./getProducts')
const { saveImages } = require('./saveImages')
const { deleteProduct } = require('./deleteProduct')
const { getProduct } = require('./getProduct')
const { updateProduct } = require('./updateProduct')

module.exports = {
  mapProduct,
  createProduct,
  getProducts,
  saveImages,
  deleteProduct,
  getProduct,
  updateProduct
}