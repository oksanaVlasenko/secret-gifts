const express = require('express');
const productMdwr = require('../middlewares/product')
const authMdwr = require('../middlewares/auth')
const productCtrl = require('../controllers/product')
//const authCtrl = require('../controllers/auth')

const productRouter = express.Router()
// productMdwr.checkValidUrl, productMdwr.fetchProductFromUrl, productCtrl.mapProduct
productRouter.post('/map-product', authMdwr.protect, productMdwr.checkValidUrl, productMdwr.fetchProductFromUrl, productCtrl.mapProduct)

module.exports = productRouter