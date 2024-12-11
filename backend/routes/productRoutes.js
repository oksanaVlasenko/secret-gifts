const express = require('express');
const productMdwr = require('../middlewares/product')
const authMdwr = require('../middlewares/auth')
const productCtrl = require('../controllers/product')
const { uploadTmp } = require('../services/multer/')

//const authCtrl = require('../controllers/auth')

const productRouter = express.Router()
// productMdwr.checkValidUrl, productMdwr.fetchProductFromUrl, productCtrl.mapProduct
productRouter.post('/map-product', authMdwr.protect, productMdwr.checkValidUrl, productMdwr.fetchProductFromUrl, productCtrl.mapProduct)
productRouter.post('/images', authMdwr.protect, uploadTmp.array('images', 10), productMdwr.updateImages, productCtrl.saveImages)
productRouter.post('/create', authMdwr.protect, productCtrl.createProduct)
productRouter.get('/', authMdwr.protect, productCtrl.getProducts)
productRouter.delete('/', authMdwr.protect, productCtrl.deleteProduct)
productRouter.get('/:id', authMdwr.protect, productCtrl.getProduct)
productRouter.patch('/edit/:id', authMdwr.protect, productMdwr.deleteImages)

module.exports = productRouter