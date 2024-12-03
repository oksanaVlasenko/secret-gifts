const express = require('express')
const usersMdwr = require('../middlewares/users')
const authMdwr = require('../middlewares/auth')
const usersCtrl = require('../controllers/users')
const { uploadTmp } = require('../services/multer/')

const userRouter = express.Router()

userRouter.get('/', authMdwr.protect, usersCtrl.getUser) 
userRouter.patch('/', authMdwr.protect, usersMdwr.checkUpdateData, usersCtrl.updateUser)
userRouter.patch('/avatar', authMdwr.protect, uploadTmp.single('avatar'), usersMdwr.updateImage, usersMdwr.checkUpdateData, usersCtrl.updateAvatar)
userRouter.delete('/avatar', authMdwr.protect, usersMdwr.deleteImage, usersMdwr.checkUpdateData, usersCtrl.updateAvatar)
userRouter.patch('/cover', authMdwr.protect, uploadTmp.single('cover'), usersMdwr.updateCoverImage, usersMdwr.checkUpdateData, usersCtrl.updateAvatar)

module.exports = userRouter