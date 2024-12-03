const { Jimp } = require("jimp")
const { uploadCloudinary, deleteOnCloudinary } = require('../../services/cloudinary')
const fs = require('fs/promises')

const updateImage = async (req, res, next) => {

    if (req.file) {

        const { path: tempUpload } = req.file
        const { avatarId: oldID } = req.user
        
        const file = await Jimp.read(tempUpload)
        file.write(tempUpload)

        if(oldID) await deleteOnCloudinary(oldID)

        const { secure_url: avatarURL, public_id: avatarId } = await uploadCloudinary(tempUpload)
        
        await fs.unlink(tempUpload)

        req.body.avatarURL = avatarURL
        req.body.avatarId = avatarId
    }
    next()
}

const updateCoverImage = async (req, res, next) => {

  if (req.file) {

      const { path: tempUpload } = req.file
      const { coverId: oldID } = req.user
      
      const file = await Jimp.read(tempUpload)
      file.write(tempUpload)

      if(oldID) await deleteOnCloudinary(oldID)

      const { secure_url: coverURL, public_id: coverId } = await uploadCloudinary(tempUpload)
      
      await fs.unlink(tempUpload)

      req.body.coverURL = coverURL
      req.body.coverId = coverId
  }
  next()
}

const deleteImage = async (req, res, next) => {
  try {
    const { avatarId: oldID } = req.user;

    if (oldID) {
      await deleteOnCloudinary(oldID);
    }

    req.body.avatarURL = null;
    req.body.avatarId = null;

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
    updateImage,
    deleteImage,
    updateCoverImage
}