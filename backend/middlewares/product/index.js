const { checkValidUrl } = require('./checkValidUrl')
const { fetchProductFromUrl } = require('./getProductFromUrl')
const { updateImages } = require('./updateImages')

module.exports = {
  checkValidUrl,
  fetchProductFromUrl,
  updateImages
}