const { Jimp } = require("jimp")
const { uploadCloudinary, deleteOnCloudinary, uploadCloudinaryMultiple } = require('../../services/cloudinary')
const fs = require('fs/promises')

const updateImages = async (req, res, next) => {
  if (req.files) {
    const images = [];

    if (req.files) {
      req.files = req.files.filter(async (file) => {
        const stats = await fs.stat(file.path);
        return stats.size > 0;
      });
    }

    let resultOfUpload = await uploadCloudinaryMultiple(req.files)

    resultOfUpload = resultOfUpload.map(img => {
      return {
        id: img.public_id,
        src: img.secure_url
      }
    })

    req.files.forEach(async (img) => {
      const { path: tempUpload } = img;

      await fs.unlink(tempUpload);
    });

    req.body.images = resultOfUpload;
  }
  next()
}

const deleteImages = async (req, res, next) => {
  const { deletedImages } = req.body 

  if (deletedImages && deletedImages.length > 0) {
    deletedImages.forEach(async (img) => {
      if(img.id) await deleteOnCloudinary(img.id)
    })
  }

  next()
}

module.exports = {
  updateImages,
  deleteImages
}