const { Jimp } = require("jimp")
const { uploadCloudinary, deleteOnCloudinary } = require('../../services/cloudinary')
const fs = require('fs/promises')

const updateImages = async (req, res, next) => {

  if (req.files) {

    const images = await Promise.all(
      req.files.map(async (img) => {
        const { path: tempUpload } = img;
    
        // Читання файлу з Jimp
        const file = await Jimp.read(tempUpload);
        file.write(tempUpload); // Перезапис файлу, якщо потрібно
        
        // Завантаження файлу на Cloudinary
        const { secure_url: imgURL, public_id: imgId } = await uploadCloudinary(tempUpload);
        
        // Видалення тимчасового файлу після завантаження
        await fs.unlink(tempUpload);
    
        // Повертаємо об'єкт з результатами
        return {
          id: imgId,
          src: imgURL
        };
      })
    );
    
    console.log(images, ' images array ')
    req.body.images = images
  }
  next()
}

module.exports = {
  updateImages
}