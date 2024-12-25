const { CLOUD_NAME_CLOUDINARY, API_KEY_CLOUDINARY, API_SECRET_CLOUDINARY } = process.env;

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: CLOUD_NAME_CLOUDINARY,
    api_key: API_KEY_CLOUDINARY,
    api_secret: API_SECRET_CLOUDINARY,
});

const prepareUploadCloudinaryMultiple = async (tempUpload) => {
    const { default: pLimit } = await import('p-limit');

    const limit = pLimit(5);
    
    return limit(async () => {
        const result = await cloudinary.uploader.upload(tempUpload);
        return result;
    });
}

const uploadCloudinaryMultiple = async (images) => {
    const validImages = images.filter(img => img && img.path);
    
    let result = await Promise.all(
        validImages.map(async (img) => {
            return await prepareUploadCloudinaryMultiple(img.path); 
        })
    );

    return result;
}


const uploadCloudinary = async (tempUpload) => {

    try {
        const result = await cloudinary.uploader.upload(tempUpload);
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