const { CLOUD_NAME_CLOUDINARY, API_KEY_CLOUDINARY, API_SECRET_CLOUDINARY } = process.env;

const cloudinary = require('cloudinary').v2;
//import pLimit from 'p-limit';
//onst { pLimit } = require('p-limit')

//const pLimit = await import('p-limit');

cloudinary.config({
    cloud_name: CLOUD_NAME_CLOUDINARY,
    api_key: API_KEY_CLOUDINARY,
    api_secret: API_SECRET_CLOUDINARY,
});

//const limit = pLimit(10)

const prepareUploadCloudinaryMultiple = async (tempUpload) => {
    const { default: pLimit } = await import('p-limit');

    const limit = pLimit(5);
    
    return limit(async () => {
        const result = await cloudinary.uploader.upload(tempUpload);
        console.log(result, ' result uploadCloudinary 55');
        return result;
    });
}

const uploadCloudinaryMultiple = async (images) => {
    // Пропускаємо некоректні файли
    const validImages = images.filter(img => img && img.path);
    
    // Викликаємо prepareUploadCloudinaryMultiple для кожного зображення
    let result = await Promise.all(
        validImages.map(async (img) => {
            return await prepareUploadCloudinaryMultiple(img.path); // передаємо шлях до файлу
        })
    );

    return result;
}


const uploadCloudinary = async (tempUpload) => {

    try {
        console.log(tempUpload, ' tem oin uploadCloudinary ')
        const result = await cloudinary.uploader.upload(tempUpload);
        console.log(result, ' result uploadCloudinary 55' )
        return result
    } catch (error) { 
        console.log(error, 'error');
        throw error;
    }
}

const deleteOnCloudinary = async (id) => {
    try {
        const result = await cloudinary.uploader.destroy(id);
    
    return result
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    uploadCloudinary,
    deleteOnCloudinary,
    uploadCloudinaryMultiple
}