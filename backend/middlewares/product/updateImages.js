const { Jimp } = require("jimp")
const { uploadCloudinary, deleteOnCloudinary, uploadCloudinaryMultiple } = require('../../services/cloudinary')
const fs = require('fs/promises')

const updateImages = async (req, res, next) => {

  // if (req.files) {

  //   const images = await Promise.all(
  //     req.files.map(async (img) => {
  //       const { path: tempUpload } = img;
    
  //       // Читання файлу з Jimp
  //       const file = await Jimp.read(tempUpload);
  //       file.write(tempUpload); // Перезапис файлу, якщо потрібно
  //       console.log(tempUpload, ' temp') 
  //       // Завантаження файлу на Cloudinary
  //       const { secure_url: imgURL, public_id: imgId } = await uploadCloudinary(tempUpload);
        
  //       // Видалення тимчасового файлу після завантаження
  //       await fs.unlink(tempUpload);
    
  //       // Повертаємо об'єкт з результатами
  //       return {
  //         id: imgId,
  //         src: imgURL
  //       };
  //     })
  //   );
    
  //   req.body.images = images
  // }

  if (req.files) {
    const images = [];

    if (req.files) {
      req.files = req.files.filter(async (file) => {
        const stats = await fs.stat(file.path);
        return stats.size > 0;
      });
    }

    let resultOfUpload = await uploadCloudinaryMultiple(req.files)

    console.log(resultOfUpload, ' result')
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

    // for (const img of req.files) {
    //   try {
    //     const { path: tempUpload } = img;

    //     const stats = await fs.stat(tempUpload);
    //     if (stats.size === 0) {
    //       throw new Error(`File is empty: ${tempUpload}`);
    //     }

    //     console.log(`Processing file: ${tempUpload}, Size: ${stats.size} bytes`);

    //     // Читання файлу через Jimp
    //     const file = await Jimp.read(tempUpload);
    //     file.write(tempUpload); // Перезапис файлу

    //     // Завантаження файлу на Cloudinary
    //     const { secure_url: imgURL, public_id: imgId } = await uploadCloudinary(tempUpload);

    //     // Видалення тимчасового файлу після завантаження
    //     await fs.unlink(tempUpload);

    //     // Додавання результату у список
    //     images.push({ id: imgId, src: imgURL });
    //   } catch (error) {
    //     console.error(`Error processing file ${img.path}:`, error.message);
    //     // Продовжуємо обробку наступних файлів
    //   }
    // }

    req.body.images = resultOfUpload;
  }
  next()
}

const deleteImages = async (req, res, next) => {
  const { deletedImages } = req.body 

  console.log(deletedImages, ' for del')

  next()
}

module.exports = {
  updateImages,
  deleteImages
}