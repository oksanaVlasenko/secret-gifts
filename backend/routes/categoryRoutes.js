const express = require('express');
const authMdwr = require('../middlewares/auth')
const categoryCtrl = require('../controllers/category')
const categoryMdwr = require('../middlewares/category')

const categoryRoutes = express.Router()

categoryRoutes.post('/create', authMdwr.protect, categoryMdwr.checkCreateCategoryData, categoryCtrl.createCategory)
categoryRoutes.get('/', authMdwr.protect, categoryCtrl.getAllCategories)
categoryRoutes.delete('/', authMdwr.protect, categoryCtrl.deleteCategory)

module.exports = categoryRoutes 