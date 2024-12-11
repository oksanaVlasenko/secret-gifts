const { checkValidUrl } = require('./checkValidUrl')
const { fetchProductFromUrl } = require('./getProductFromUrl')
const { updateImages } = require('./updateImages')
const { deleteImages } = require('./updateImages')
const { checkUpdateProduct } = require('./checkUpdateProduct')

module.exports = {
  checkValidUrl,
  fetchProductFromUrl,
  updateImages,
  deleteImages,
  checkUpdateProduct
}