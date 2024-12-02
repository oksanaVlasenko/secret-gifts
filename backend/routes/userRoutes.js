const express = require('express')
const usersMdwr = require('../middlewares/users')
const authMdwr = require('../middlewares/auth')
const usersCtrl = require('../controllers/users')
//const { uploadTmp } = require('../services/multer/')

const userRouter = express.Router()

userRouter.get('/', authMdwr.protect, usersCtrl.getUser) 
userRouter.patch('/', authMdwr.protect, usersMdwr.checkUpdateData, usersCtrl.updateUser)

module.exports = userRouter